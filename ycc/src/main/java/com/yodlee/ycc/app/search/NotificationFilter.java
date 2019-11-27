/**
 *
 * Copyright (c) 2018 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */

package com.yodlee.ycc.app.search;

/**
 * 
 * @author sjain5
 *
 */

public class NotificationFilter extends RequestParameters {

	private String notificationObj;

	private String notificationId;

	private String notificationType;

	private String notificationSubType;

	private String notificationStatus;

	private String notificationSubStatus;

	private String ticketNum;

	private String bugNum;

	private String criticality;

	private String priority;

	private String startTime;
	
	private String fromDate;
	
	private String toDate;


	private String endTime;

	private String environment;
	
	private String isExportRequest;
	
	private String title;
	
	private String description;
	
	private String dependencies;
	
	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getIsExportRequest() {
		return isExportRequest;
	}

	public void setIsExportRequest(String isExportRequest) {
		this.isExportRequest = isExportRequest;
	}

	private String attachmentId;

	public String getNotificationType() {
		return notificationType;
	}

	public void setNotificationType(String notificationType) {
		this.notificationType = notificationType;
	}

	public String getNotificationSubType() {
		return notificationSubType;
	}

	public void setNotificationSubType(String notificationSubType) {
		this.notificationSubType = notificationSubType;
	}

	public String getNotificationStatus() {
		return notificationStatus;
	}

	public void setNotificationStatus(String notificationStatus) {
		this.notificationStatus = notificationStatus;
	}

	public String getTicketNum() {
		return ticketNum;
	}

	public void setTicketNum(String ticketNum) {
		this.ticketNum = ticketNum;
	}

	public String getBugNum() {
		return bugNum;
	}

	public void setBugNum(String bugNum) {
		this.bugNum = bugNum;
	}

	public String getCriticality() {
		return criticality;
	}

	public void setCriticality(String criticality) {
		this.criticality = criticality;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public void setNotificationObj(String notificationObj) {
		this.notificationObj = notificationObj;
	}

	public String getNotificationObj() {
		return notificationObj;
	}

	public void setNotificationCreateObj(String notificationObj) {
		this.notificationObj = notificationObj;
	}

	public String getNotificationId() {
		return notificationId;
	}

	public void setNotificationId(String notificationId) {
		this.notificationId = notificationId;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public String getNotificationSubStatus() {
		return notificationSubStatus;
	}

	public void setNotificationSubStatus(String notificationSubStatus) {
		this.notificationSubStatus = notificationSubStatus;
	}

	public String getEnvironment() {
		return environment;
	}

	public void setEnvironment(String environment) {
		this.environment = environment;
	}

	public String getAttachmentId() {
		return attachmentId;
	}

	public void setAttachmentId(String attachmentId) {
		this.attachmentId = attachmentId;
	}
	public String getFromDate() {
		return fromDate;
	}

	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	public String getToDate() {
		return toDate;
	}

	public void setToDate(String toDate) {
		this.toDate = toDate;
	}

	

	public String getDependencies() {
		return dependencies;
	}

	public void setDependencies(String dependencies) {
		this.dependencies = dependencies;
	}

}
