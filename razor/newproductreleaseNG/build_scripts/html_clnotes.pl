#!/usr/bin/env perl
use Data::Dumper; 
use POSIX qw( strftime );

my $Date = strftime("%m%d%Y", localtime);
print "Today date is $Date \n";

my $file="PD_CLNotes_$ARGV[0].Build.$ARGV[1].html";
print "\n$file\n";

open OUTPUT,"> PD_CLNotes_$ARGV[0].Build.$ARGV[1].html" or die "Cannot open the file";
print OUTPUT "<p align=\"center\"><strong><font size=\"4\" COLOR=\"green\" > Build Notes - Yodlee Platform version \"$ARGV[0].Build.$ARGV[1]\"(Tag \"$ARGV[3]\")</font></strong></p>";

print OUTPUT  "\n\n";
my $prev = $ARGV[1] - 1;
print OUTPUT "<p align=\"center\"><font size=\"4\" COLOR=\"#cc6600\" > The CL report Between $ARGV[0] Build $prev and $ARGV[1] </font></p>";

print OUTPUT  "\n\n";

my $Day = strftime("%A", localtime);
my $fontColor = "D2L";
&populatetable;

sub populatetable 
{
open(my $FILE, ">>$file") or die "Cannot open $file: $!";
print $FILE "<HTML>\n";
print $FILE "<table style=\"HEIGHT: 77px\" bordercolor=\"00008B\" cellspacing=\"1\" cellPadding=\"3\" align=\"center\" border=\"1\">\n";
print $FILE "<tr bgcolor=\"ccccff\">";
print $FILE "<td><p align=\"center\">Bug ID / User Story ID</p></td>";
print $FILE "<td><p align=\"center\">Bug Status</p></td>";
print $FILE "<td><p align=\"center\">Client</p></td>";
print $FILE "<td><p align=\"center\">Components</p></td>";
print $FILE "<td><p align=\"center\">Product</p></td>";
print $FILE "<td><p align=\"center\">Version</p></td>";
print $FILE "<td><p align=\"center\">CLs</p></td>";
print $FILE "<td><p align=\"center\">Description</p></td>";
print $FILE "<td><p align=\"center\">UserName</p></td>";
print $FILE "<td><p align=\"center\">Checked-In Date(PST)</p></td>";
print $FILE "<td><p align=\"center\">CLsBranch</p></td>";

my @array1 = (`cat fileBugs.txt`);
my @array2 = (`cat bugStatus.txt`);
my @array3 = (`cat bugCustomer.txt`);
my @array4 = (`cat bugComponent.txt`);
my @array5 = (`cat bugProduct.txt`);
my @array6 = (`cat bugVersion.txt`);
my @array7 = (`cat fileCLs.txt`);
my @array8 = (`cat clsDesc.txt`);
my @array9 = (`cat clsUser.txt`);
my @array10 = (`cat clsCheckinDate.txt`);
my @array11 = (`cat clsBranch.txt`);

my @matrix=(\@array1, \@array2, \@array3, \@array4, \@array5, \@array6, \@array7, \@array8, \@array9, \@array10, \@array11);
#print "$#{$matrix[0]}";
#my $count=`wc -l < fileNo.txt`;
#print $count;

#print "@array1";
#print "@array2";
   for my $row (0 .. $#{$matrix[0]}) {
      print $FILE "<tr bgcolor=\"cc9999\" ><td><p align=\"left\">$matrix[0][$row]</p></td><td><p align=\"left\">$matrix[1][$row]</p></td><td><p align=\"left\">$matrix[2][$row]</p></td><td><p align=\"left\">$matrix[3][$row]</p></td><td><p align=\"left\">$matrix[4][$row]</p></td><td><p align=\"left\">$matrix[5][$row]</p></td><td><p align=\"left\">$matrix[6][$row]</p></td><td><p align=\"left\">$matrix[7][$row]</p></td><td><p align=\"left\">$matrix[8][$row]</p></td><td><p align=\"left\">$matrix[9][$row]</p></td><td><p align=\"left\">$matrix[10][$row]</p></td></tr>\n";
}
print $FILE "</table>";
close($FILE);
}
print "Your html has been created\n";
