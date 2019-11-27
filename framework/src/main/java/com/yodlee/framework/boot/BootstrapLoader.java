/**
 * 
 * Copyright (c) 2016 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 * 
 */

package com.yodlee.framework.boot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;


/**
 * <code>BootstrapLoader</code>  boots Spring Application 
  */
@SpringBootApplication
@ComponentScan("com.yodlee")
public class BootstrapLoader extends SpringBootServletInitializer {

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.springframework.boot.context.web.SpringBootServletInitializer#configure
	 * (org.springframework.boot.builder.SpringApplicationBuilder)
	 */
	@Override
	protected SpringApplicationBuilder configure(
			final SpringApplicationBuilder builder) {
		return builder.sources(BootstrapLoader.class);
	}

	/**
	 * @param args
	 */
	public static void main(final String[] args) {
		SpringApplication.run(BootstrapLoader.class, args);
	}
}
