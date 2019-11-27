/**
 *
 * Copyright (c) 2018 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */

package com.yodlee.ycc.app.constants;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * 
 * @author sjain5
 *
 */

@Component
public class URIConstant {

	@Value("${com.yodlee.ycc.app.ysl.url}")
	public String yslBaseUrl;

	public final String Notification_Create = "notification/create";

	public final String Notification_Search_All_Data = "notification/searchforalldata";
	
	public final String Notification_Search = "notification/search";

	public final String Notification_Edit = "notification/update";

	public final String Notification_Statuses = "notification/status";

	public final String Notification_Cob_Backend_details = "dataflow/cobrandinfo";

	public final String Notification_Download = "notification/download";

	public final String userContactInfo_Create = "usercontactinfo/create";

	public final String userContactInfo_Search = "usercontactinfo/search";

	public final String userContactInfo_Edit = "usercontactinfo/update";
	
	public final String userContactInfo_Delete = "usercontactinfo/delete";

	public final String userContactInfo_BulkUpload = "usercontactinfo/bulkupload";
	
	public final String userContactInfo_CobrandMapping = "usercontactinfo/bulkUploadCobrandMapping";

	public final String userContactInfo_FileHistory = "usercontactinfo/filehistory";

	public final String userContactInfo_userRole = "usercontactinfo/role";
	
	public final String SiteNotification_Create = "sitenotification/create";
	
	public final String SiteNotification_Search = "sitenotification/search";

	public final String SiteNotification_Edit = "sitenotification/update";
	
	public final String SiteNotification_Site_Data = "sitenotification/site";
	
	public final String SiteNotification_Cobrand_Data = "cobrand?cobrandIds=";
	
}
