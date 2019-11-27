/**
 *
 * Copyright (c) 2019 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */

package com.yodlee.ycc.app.search;

import java.util.List;

/**
 * 
 * @author smaji
 *
 */

public class SiteNotificationFilter extends RequestParameters {

	private String siteNotificationObj;

	private String siteNotificationId;
	
	private String siteId;

	private String notificationSubType;

	private String status;

	private String bugId;

	private String startTime;

	private String etaTime;

	private String isExportRequest;
	
	private String label;
	
	private String cobrand;
	

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}
		
	public String getSiteId() {
		return siteId;
	}

	public void setSiteId(String siteId) {
		this.siteId = siteId;
	}


	public String getIsExportRequest() {
		return isExportRequest;
	}

	public void setIsExportRequest(String isExportRequest) {
		this.isExportRequest = isExportRequest;
	}

	public String getNotificationSubType() {
		return notificationSubType;
	}

	public void setNotificationSubType(String notificationSubType) {
		this.notificationSubType = notificationSubType;
	}

	public String getStatus() {
		return status;
	}

	public void setNotificationStatus(String status) {
		this.status = status;
	}

	public String getBugId() {
		return bugId;
	}

	public void setBugId(String bugId) {
		this.bugId = bugId;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEtaTime() {
		return etaTime;
	}

	public void setEtaTime(String etaTime) {
		this.etaTime = etaTime;
	}

	public void setSiteNotificationObj(String siteNotificationObj) {
		this.siteNotificationObj = siteNotificationObj;
	}

	public String getSiteNotificationObj() {
		return siteNotificationObj;
	}

	public String getSiteNotificationId() {
		return siteNotificationId;
	}

	public void setSiteNotificationId(String siteNotificationId) {
		this.siteNotificationId = siteNotificationId;
	}

	public String getCobrand() {
		return cobrand;
	}

	public void setCobrand(String cobrand) {
		this.cobrand = cobrand;
	}


}
