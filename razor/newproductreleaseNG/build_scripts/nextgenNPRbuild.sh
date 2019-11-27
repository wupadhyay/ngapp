PWd=`pwd`
source ./build.properties
BUILD_NUMBER=`cat build.properties | grep "Build_Number"|cut -f2 -d"="`
previousbuildnumber=$BUILD_NUMBER
Build_Number=`expr $BUILD_NUMBER + 1`
LATEST_CL=`p4 changes -m1|awk '{print $2}'`
FULL_SYNC_BUILD="build"
PATCH_SYNC_BUILD="patch"
BUILD_TYPE=$1
DATE=`date +%m%d%Y`
source ./$BUILD_TYPE.conf

die() {
        print $*
        exit 1
}

init ()
{
if [ -f /tmp/build-$CL_BRANCH_NAME-progress ]
then
die "$CL_BRANCH_NAME Build is in progrees. Try after somtime"
else
touch /tmp/build-$CL_BRANCH_NAME-progress
fi

if [ "$BUILD_TYPE" = "$PATCH_SYNC_BUILD" ];
then
Build_Number=`echo $NEW_LABEL|cut -f5 -d"_"`
Patch_Number=`echo $NEW_LABEL|cut -f7 -d"_"`
fi

clean $*
p4sync $*
}

clean ()
{
rm -rf logs/
rm -rf /var/log/yodlee/gatherer/*
rm -rf /home/gatherer/logs/*
mkdir logs/
}

p4sync ()
{
DEPOT_LIST=`p4 client -o | grep "//" | sed 's/^[ \t]*//g' | cut -d " " -f1`
        for depot in $DEPOT_LIST
        do
		if [ "$BUILD_TYPE" = "$FULL_SYNC_BUILD" ];
        	then
			p4 sync $depot@$LATEST_CL 2>&1 | tee -a logs/sync.log
		elif [ "$BUILD_TYPE" = "$PATCH_SYNC_BUILD" ];
                then
                        echo "syncing with old label"
                        p4 sync $depot@$BASE_LABEL 2>&1 | tee -a logs/sync.log
                        clsync $*
		else
			p4 sync $depot@$BASE_LABEL 2>&1 | tee -a logs/sync.log
		fi
	done

	 if [ "$BUILD_TYPE" = "$FULL_SYNC_BUILD" ];
         then
                check_sync $*
         else
                echo "nothing"
         fi

}

check_sync ()
{
count=`cat logs/sync.log |grep -i "updating\|added\|move\|\- deleted"|awk '{print $1}' |wc -l`
if [ $count -gt 0 ]
then
start_build $*
else
subjectvalue="$CL_BRANCH_NAME.$BUILD_TYPE.$Build_Number skipped: No Changes To Build"
  echo "<html> <body> <b>Hello All, </b> <p style="color:green"> $subjectvalue after previous build </p>     <p>Thanks & Regards, <br> Build-Desk@yodlee.com </p>" >skippedmessage.html
 cp -rf skippedmessage.html skippedmessage.html
  mvn validate -Dsubjectvalue="$subjectvalue" -Dmessagefile=skippedmessage.html -Dclnotes=skippedmessage.html -Dlogfile="logs/$CL_BRANCH_NAME$BUILD_TYPE.log" -DBUILD_NUMBER=$Build_Number -DPATCH_NUMBER=$Patch_Number -DBUILD_TYPE=build -DBRANCH=$BRANCH_NAME -DRELEASE_VERSION=$RELEASE_NAME -DJSON_RELEASE_VERSION=$RELEASE_NAME -Pbuildmail -f pom.xml
kill_progress_file $*
exit
fi
}

clsync ()
{
        if [ "$BUILD_TYPE" = "$PATCH_SYNC_BUILD" ];
        then
                for change_list in `echo $CHANGELISTS | sed 's/,/ /g'`
                do
                        echo "Processing changelist $change_list"
                        FILES_LIST=`p4 describe -s $change_list | grep "... \/\/" | grep [#] | awk '{print $2}'`
                        for file in $FILES_LIST
                        do
                                actual_file=`echo $file | cut -f1 -d "#"`
                                client_file=`p4 have $actual_file | awk '{print $1}'`
                                cl_version=
                                cl_version=`echo $file | cut -f2 -d "#"`
                                client_version=
                                client_version=`echo $client_file | cut -f2 -d "#"`
                                if [ x"$cl_version" = x  -o x"$client_version" = x ];
                                then
                                        if [ $cl_version -ge 1 -a x"$client_version" = x ];
                                        then
                                                echo "$file not available"
                                                # Let us move this some where else
                                                touch sync.txt
                                                echo "$actual_file@$change_list" >> logs/sync.log
                                                p4 sync $actual_file@$change_list >> logs/clsync.log 2>&1
                                        else
                                                echo "Ignoring the file $file"
                                        fi
                                else
                                        if [ $cl_version -gt $client_version ];
                                        then
                                                print "$file not available"
                                                # Let us move this some where else
                                                touch sync.txt
                                                echo "$actual_file@$change_list" >> logs/sync.log
                                                p4 sync $actual_file@$change_list >> logs/clsync.log 2>&1
                                        else
                                                print "$file already available"
                                        fi
                                fi
                        done
                done

                deletedfile=`cat logs/clsync.log |grep "\- deleted" |awk '{print $1}'|cut -f1 -d"#"`
		echo " " >updated.lst
               for i in `echo $deletedfile`
                  do
                    deletedfile_revison=`cat logs/clsync.log | grep "$i"|grep "\- deleted"|awk '{print $1}'|cut -f2 -d"#"`
                    labeldeltedfile_revision=`expr $deletedfile_revison + 1 `
                    cat logs/clsync.log | grep "$i"|grep "\- deleted"|awk '{print $1}'|cut -f1 -d"#" |sed -e "s/$/#$labeldeltedfile_revision/g" >>updated.lst
                  done
               cat logs/clsync.log |grep -i "updating\|added\|move"|awk '{print $1}' >>updated.lst
               cat updated.lst | sort |uniq &>updatepatchlabel.lst
        else
                echo "Build type is not $PATCH_SYNC_BUILD"
        fi
start_build $*
}

start_build ()
{
echo "Release=$BUILD_RELEASE_VERSION" > $PWd/../../../version.info
echo "APP_NAME=$CL_BRANCH_NAME" >> $PWd/../../../version.info
echo "Branch=$BRANCH_NAME" >> $PWd/../../../version.info
echo "BuildNumber=$Build_Number" >> $PWd/../../../version.info
echo "PatchNumber=$Patch_Number" >> $PWd/../../../version.info


cd /opt/build/src/razor_newproductreleaseNG/
mvn clean package -Pwarbuild -f pom.xml 2>&1 | tee -a ../../build_scripts/logs/$CL_BRANCH_NAME$BUILD_TYPE.log
mvn install -Pwarbuild -f pom.xml

COUNT=`cat ../../build_script/logs/$CL_BRANCH_NAME$BUILD_TYPE.log|grep 'BUILD FAILURE'|wc -l`
if [ $COUNT -gt 0 ]
then
	cd /opt/build/src/razor_newproductreleaseNG/razor/newproductreleaseNG/build_scripts
	check_status $*
else
	cd /opt/build/src/razor_newproductreleaseNG/razor/newproductreleaseNG/build_scripts

fi
check_status $*
}

check_status ()
{
COUNT=`cat logs/$CL_BRANCH_NAME$BUILD_TYPE.log|grep 'BUILD FAILURE'|wc -l`
 if [ "$BUILD_TYPE" = "$FULL_SYNC_BUILD" ];
 then
	if [ $COUNT -gt 0 ]
	then
		sed -i 's/BUILD_STATUS=.*/BUILD_STATUS=failed/g' build.properties
		source ./build.properties
		sendmail $*
		kill_progress_file $*
		exit -1
	else
		BUILD_STATUS=success
		sed -i 's/BUILD_STATUS=.*/BUILD_STATUS=success/g' build.properties
		sed -i 's/Build_Number=.*/Build_Number='$Build_Number'/g' build.properties
		copy_installer $*
		create_label $*
		sendmail $i*
		kill_progress_file $*
	fi
  else
	if [ $COUNT -gt 0 ]
        then
		BUILD_STATUS=failed
		echo "Sendmail saying build failed"
		if [ "$BUILD_TYPE" = "$PATCH_SYNC_BUILD" ];
                then
			sendpatchmail $*
			kill_progress_file $*
		else
			sendmail $*
			kill_progress_file $*
		fi
	else
		if [ "$BUILD_TYPE" = "$PATCH_SYNC_BUILD" ];
		then
			 BUILD_STATUS=Success
                        copy_installer $*
                        create_patchlabel $*
                        echo "copy installers and create patchlabel"
		else
			echo "senmail saying rebuild is completed"
		fi
	fi
   fi
}

copy_installer ()
{
if [ "$BUILD_TYPE" = "$PATCH_SYNC_BUILD" ];
then
mkdir -p $INSTALLER_LOCATION/$CL_BRANCH_NAME.PatchBuild.$Build_Number.$Patch_Number/

cp -r /opt/build/src/razor_newproductreleaseNG/ycc/target/ngycc.war $INSTALLER_LOCATION/$CL_BRANCH_NAME.PatchBuild.$Build_Number.$Patch_Number/

else

mkdir -p $INSTALLER_LOCATION/$CL_BRANCH_NAME.build.$Build_Number/
cp -r /opt/build/src/razor_newproductreleaseNG/ycc/target/ngycc.war $INSTALLER_LOCATION/$CL_BRANCH_NAME.build.$Build_Number

fi
}

create_label ()
{
p4 label -o -t "$CL_BRANCH_NAME"_nightly razor_"$CL_BRANCH_NAME"_"$Build_Number"_"$DATE"_"$Patch_Number" >temp.txt
p4 label -i <temp.txt
DEPOT_LIST=`p4 client -o | grep "//" | sed 's/^[ \t]*//g' | cut -d " " -f1`
        for depot in $DEPOT_LIST
        do
	p4 tag -l razor_"$CL_BRANCH_NAME"_"$Build_Number"_"$DATE"_"$Patch_Number" $depot@$LATEST_CL 2>&1 | tee -a logs/labelcreation.log
	done
creatensubmit_clnotes $*
#sendmail $i*
kill_progress_file $*
}

create_patchlabel ()
{
p4 label -o -t $BASE_LABEL $NEW_LABEL >temp.txt
p4 label -i <temp.txt
DEPOT_LIST=`p4 client -o | grep "//" | sed 's/^[ \t]*//g' | cut -d " " -f1`
        for depot in $DEPOT_LIST
        do
	p4 tag -l $NEW_LABEL $depot@$BASE_LABEL 2>&1 | tee -a logs/labelcreation.log
	p4 -x updatepatchlabel.lst tag -l $NEW_LABEL
	done
creatensubmit_patchclnotes $*
}

creatensubmit_patchclnotes ()
{
sh create_clnotes.sh "$CL_BRANCH_NAME" $Build_Number.$Patch_Number $BASE_LABEL $NEW_LABEL
export P4CLIENT=$P4CLIENT_BUILDNOTES
cp -r PD_CLNotes_"$CL_BRANCH_NAME".Build.$Build_Number.$Patch_Number.html $ROOT_BUILDNOTES_DIR//
p4 add "$ROOT_BUILDNOTES_DIR//PD_CLNotes_$CL_BRANCH_NAME.Build.$Build_Number.$Patch_Number.html"
p4 submit -d "Submitting  CLNOTES" "$ROOT_BUILDNOTES_DIR//PD_CLNotes_$CL_BRANCH_NAME.Build.$Build_Number.$Patch_Number.html" &>submitclnotes.log
sendpatchmail $*
}

creatensubmit_clnotes ()
{
Old_Label=`p4 labels -e "razor_"$CL_BRANCH_NAME"_"$previousbuildnumber"_*"|grep "_00"|awk '{print $2}'`
New_Label=`p4 labels -e "razor_"$CL_BRANCH_NAME"_"$Build_Number"_*"|grep "_00"|awk '{print $2}'`
sh create_clnotes.sh "$CL_BRANCH_NAME" $Build_Number $Old_Label $New_Label
export P4CLIENT=$P4CLIENT_BUILDNOTES
cp -r PD_CLNotes_"$CL_BRANCH_NAME".Build.$Build_Number.html $ROOT_BUILDNOTES_DIR//
p4 add "$ROOT_BUILDNOTES_DIR//PD_CLNotes_$CL_BRANCH_NAME.Build.$Build_Number.html"
p4 submit -d "Submitting  CLNOTES" "$ROOT_BUILDNOTES_DIR//PD_CLNotes_$CL_BRANCH_NAME.Build.$Build_Number.html" &>submitclnotes.log
}
sendmail ()
{
if [ "$BUILD_TYPE" = "$FULL_SYNC_BUILD" -a "$BUILD_STATUS" = "success" ];
 then
 subjectvalue="$CL_BRANCH_NAME.$BUILD_TYPE.$Build_Number is completed successfully"
  echo "<html> <body> <b>Hello All, </b> <p style="color:green"> $subjectvalue and installers are available at below location in 192.168.210.72 box.Please find the attached CLNotes</p> <p><b>Path:$INSTALLER_LOCATION/$CL_BRANCH_NAME.$BUILD_TYPE.$Build_Number</b></p>	<p>Thanks & Regards, <br> Build-Desk@yodlee.com </p>" >successmessage.html
cp -rf successmessage.html successmessage.html
  mvn validate -Dsubjectvalue="$subjectvalue" -Dmessagefile=successmessage.html -Dclnotes=PD_CLNotes_"$CL_BRANCH_NAME".Build.$Build_Number.html -Dlogfile="logs/$CL_BRANCH_NAME$BUILD_TYPE.log" -DBUILD_NUMBER=$Build_Number -DPATCH_NUMBER=$Patch_Number -DBUILD_TYPE=build -DBRANCH=$BRANCH_NAME -DRELEASE_VERSION=$RELEASE_NAME -DJSON_RELEASE_VERSION=$RELEASE_NAME -Pbuildmail  -f pom.xml
  else
 subjectvalue="$CL_BRANCH_NAME.$BUILD_TYPE.$Build_Number is failed"
echo "<html> <body> <b>Hello All, </b> <p style="color:red"> $subjectvalue. Please find the attached Failure log</p> <p>Thanks & Regards, <br> Build-Desk@yodlee.com </p>" >failuremessage.html
 cp -rf failuremessage.html failuremessage.html
 cp -r ./logs/$CL_BRANCH_NAME$BUILD_TYPE.log failure.log
 unix2dos failure.log
  mvn validate -Dsubjectvalue="$subjectvalue" -Dmessagefile=failuremessage.html -Dclnotes="failure.log" -Dlogfile="logs/buildlogs.tar.gz" -DBUILD_NUMBER=$Build_Number -DPATCH_NUMBER=$Patch_Number -DBUILD_TYPE=build -DBRANCH=$BRANCH_NAME -DRELEASE_VERSION=$RELEASE_NAME -DJSON_RELEASE_VERSION=$RELEASE_NAME -Pbuildmail -f pom.xml
 fi

kill_progress_file $*
}

sendpatchmail ()
{
subjectvalue="$CL_BRANCH_NAME.$BUILD_TYPE.$Build_Number.$Patch_Number is $BUILD_STATUS"
echo "<html> <body> <b>Hello All, </b> <p style="color:green"> $subjectvalue and installers are available at below location in 192.168.56.84 box.Please find the attached CLNotes</p> <p><b>Path:$INSTALLER_LOCATION/$CL_BRANCH_NAME.PatchBuild.$Build_Number.$Patch_Number</b></p>    <p>Thanks & Regards, <br> Build-Desk@yodlee.com </p>" >successmessage.html
cp -rf successmessage.html successmessage.html
mvn validate -Dsubjectvalue="$subjectvalue" -Dmessagefile=successmessage.html -Dclnotes=PD_CLNotes_"$CL_BRANCH_NAME".Build.$Build_Number.$Patch_Number.html -DBUILD_NUMBER=$Build_Number -DPATCH_NUMBER=$Patch_Number -DBUILD_TYPE=patch -DBRANCH=$BRANCH_NAME -DRELEASE_VERSION=$RELEASE_NAME -DJSON_RELEASE_VERSION=$RELEASE_NAME -Dlogfile="logs/$CL_BRANCH_NAME$BUILD_TYPE.log" -Pbuildmail -f pom.xml

kill_progress_file $*
}

kill_progress_file ()
{
rm -rf /tmp/build-$CL_BRANCH_NAME-progress
}

init $*	
