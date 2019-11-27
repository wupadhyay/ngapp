/**
 * Copyright (c) 2016 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */

package com.yodlee.ycc.app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.yodlee.framework.web.config.WebConfigurerAdapter;

@Configuration
@EnableWebMvc
public class WebMvcConfig extends WebConfigurerAdapter {

	private final String[] resources = { "static", "views", "modules", "scripts", "fonts", "styles", "images" };

	public WebMvcConfig() {
	}

	@Override
	public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
		configurer.enable();
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.yodlee.tools.app.web.config.WebConfigurerAdapter#getResourcePaths()
	 */
	@Override
	protected String[] getResourcePaths() {
		return this.resources;
	}
}
