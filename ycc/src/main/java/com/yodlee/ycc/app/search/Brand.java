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

public class Brand {

	private String siteId;
	private List<CobrandData> cobrandId;

	public List<CobrandData> getCobrandId() {
		return cobrandId;
	}

	public void setCobrandId(List<CobrandData> brand) {
		this.cobrandId = brand;
	}

	public String getSiteId() {
		return siteId;
	}

	public void setSiteId(String siteId) {
		this.siteId = siteId;
	}

}
