/**
 * com.yodlee.tools.app.spring
 *
 *
 * Copyright (c) 2016 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 * 
 * @author bsadavarthi
 *
 */

package com.yodlee.framework.spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;

@Component
public class ApplicationContextProvider {

  private static ApplicationContext context;

/**
 * Initialize application context
 * @param context
 */
  @Autowired
  public void setApplicationContext(final ApplicationContext context) {
    ApplicationContextProvider.context = context;
  }

  /**
   * @return the context
   */
  public static ApplicationContext getContext() {
    return ApplicationContextProvider.context;
  }

}
