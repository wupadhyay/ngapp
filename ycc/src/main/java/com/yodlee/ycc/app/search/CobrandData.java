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

public class CobrandData {

	private Long cobrandId;
	private String cobrandName;
	private List<CobContainers> containers;

	public Long getCobrandId() {
		return cobrandId;
	}

	public void setCobrandId(Long cobrandId) {
		this.cobrandId = cobrandId;
	}

	public String getCobrandName() {
		return cobrandName;
	}

	public void setCobrandName(String name) {
		this.cobrandName = name;
	}

	public List<CobContainers> getContainers() {
		return containers;
	}

	public void setContainers(List<CobContainers> containers) {
		this.containers = containers;
	}

}
