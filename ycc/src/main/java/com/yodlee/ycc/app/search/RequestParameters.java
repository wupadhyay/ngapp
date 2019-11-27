/**
 *
 * Copyright (c) 2016 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */

package com.yodlee.ycc.app.search;

public class RequestParameters {

	private String exceptionStackTrace;

	private String userSession;

	private String cobrandId;

	private String customerId;

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public String getCobrandId() {
		return cobrandId;
	}

	public void setCobrandId(String cobrandId) {
		this.cobrandId = cobrandId;
	}

	public String getExceptionStackTrace() {
		return exceptionStackTrace;
	}

	public void setExceptionStackTrace(String exceptionStackTrace) {
		this.exceptionStackTrace = exceptionStackTrace;
	}

	public String getUserSession() {
		return userSession;
	}

	public void setUserSession(String userSession) {
		this.userSession = userSession;
	}

	public RequestParameters() {
		super();
	}

	@Override
	public String toString() {
		return "RequestParameters [exceptionStackTrace=" + exceptionStackTrace + ", userSession=" + userSession
				+ ", cobrandId=" + cobrandId + ", customerId=" + customerId + "]";
	}

}
