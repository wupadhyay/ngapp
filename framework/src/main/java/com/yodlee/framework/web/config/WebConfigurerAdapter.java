/**
 *
 * Copyright (c) 2016 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 * 
 * @author bsadavarthi
 */

package com.yodlee.framework.web.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.JstlView;
import org.springframework.web.servlet.view.UrlBasedViewResolver;

public abstract class WebConfigurerAdapter extends WebMvcConfigurerAdapter {

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter
	 * # configureMessageConverters(java.util.List)
	 */
	@Override
	public void configureMessageConverters(
			final List<HttpMessageConverter<?>> converters) {
		converters.add(new MappingJackson2HttpMessageConverter());
	}

	/**
	 * @return
	 */
	@Bean
	public ViewResolver resolver() {
		final UrlBasedViewResolver url = new UrlBasedViewResolver();
		url.setPrefix("/WEB-INF/views/");
		url.setViewClass(JstlView.class);
		url.setSuffix(".jsp");
		return url;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter
	 * # addResourceHandlers(org.springframework.web.servlet.config.annotation.
	 * ResourceHandlerRegistry)
	 */
	@Override
	public void addResourceHandlers(final ResourceHandlerRegistry registry) {
		for (final String resource : this.getResourcePaths()) {
			registry.addResourceHandler("/" + resource + "/**")
					.addResourceLocations("/" + resource + "/");
		}

		registry.addResourceHandler("/webjars/**")
				.addResourceLocations("classpath:/META-INF/resources/webjars/")
				.setCachePeriod(60 * 60);
	}

	/**
	 * @return
	 */
	protected abstract String[] getResourcePaths(
			// if there are many resources required for the application
			);

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter
	 * # addCorsMappings(org.springframework.web.servlet.config.annotation.
	 * CorsRegistry)
	 */
	@Override
	public void addCorsMappings(final CorsRegistry registry) {
		registry.addMapping(this.getRootRoute());
	}

	/**
	 * @return
	 */
	protected String getRootRoute() {
		return "/*";
	}
}
