/**
 *
 * Copyright (c) 2018 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */

package com.yodlee.ycc.app.service;


/**
 * 
 * @author sjain5
 *
 */

public interface RestResource {
	
	public String post(final String uri , final String userSession, final String cobrandId, final String appId,final String data);
	
	public String get(final String uri , final String userSession, final String cobrandId, final String appId);
	
	public String put(final String uri , final String userSession, final String cobrandId, final String appId,final String data);
	
}
