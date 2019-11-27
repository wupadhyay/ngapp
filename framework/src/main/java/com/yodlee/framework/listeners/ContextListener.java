/**
 *
 * Copyright (c) 2016 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 */

package com.yodlee.framework.listeners;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

@Component
public class ContextListener {

	private static Logger logger = LoggerFactory
			.getLogger(ContextListener.class);

	@Autowired
	protected ApplicationContext context;

}
