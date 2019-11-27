/**
 *
 * Copyright (c) 2016 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */

package com.yodlee.ycc.test.web.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.springframework.test.context.web.WebAppConfiguration;
import org.testng.annotations.BeforeClass;

import com.yodlee.framework.boot.BootstrapLoader;



@ContextConfiguration(classes = { BootstrapLoader.class })
@ActiveProfiles("testng")
@WebAppConfiguration
public abstract class AbstractMainTest extends AbstractTestNGSpringContextTests  {

	 private static Logger logger = LoggerFactory.getLogger(AbstractMainTest.class);

	 
	 @BeforeClass
	  public void setupMainModule() {
	    logger.info("initializing before class for Abstract Main Test");
	  }

}
