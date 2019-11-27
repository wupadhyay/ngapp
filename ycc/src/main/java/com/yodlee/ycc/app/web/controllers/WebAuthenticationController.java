/**
 *
 * Copyright (c) 2016 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */

package com.yodlee.ycc.app.web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class WebAuthenticationController {

	/**
	 * @param model
	 * @return
	 */
	@RequestMapping({ "/", "/home" })
	public String homePage(final ModelMap model) {
		return "home";
	}

}
