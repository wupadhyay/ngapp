/**
 * Copyright (c) 2017 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */

package com.yodlee.ycc.app.search;

/**
 * <code>GlobalMessageSearchFilter<code> class will contain all the filter
 * attributes used for global messages
 * 
 * @author bsadavarthi
 */
public class GlobalMessageSearchFilter extends RequestParameters {

	private String providerIds;

	private String statuses;

	public GlobalMessageSearchFilter() {
		super();
	}

	public String getProviderIds() {
		return providerIds;
	}

	public void setProviderIds(String providerIds) {
		this.providerIds = providerIds;
	}

	public String getStatuses() {
		return statuses;
	}

	public void setStatuses(String statuses) {
		this.statuses = statuses;
	}

}
