/**
 *
 * Copyright (c) 2016 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */

package com.yodlee.framework.config;

import javax.validation.Validator;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

/**
 * <code>AppConfig</code> loads application configuration
 *
 */

@Configuration
@EnableConfigurationProperties
//@PropertySource(value = { "classpath:config.properties" }, ignoreResourceNotFound = false)
public class AppConfig {

  /**
   * @return
   */
  @Bean
  public static PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
    return new PropertySourcesPlaceholderConfigurer();
  }

  /**
   * @return
   */
  @Bean
  public Validator getLocalValidatorFactoryBean() {
    return new LocalValidatorFactoryBean();
  }

  /**
   * @return
   */
  public MessageSource messageSource() {
    final ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
   // messageSource.setBasenames("classpath:i18n/messages");
    messageSource.setUseCodeAsDefaultMessage(true);
    messageSource.setDefaultEncoding("UTF-8");
   // messageSource.setCacheSeconds(0);
    return messageSource;
  }
}
