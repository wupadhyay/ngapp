/**
 *
 * Copyright (c) 2019 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */

package com.yodlee.ycc.app.service.notifcation;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.yodlee.ycc.app.constants.URIConstant;
import com.yodlee.ycc.app.search.NotificationFilter;
import com.yodlee.ycc.app.search.SiteNotificationFilter;
import com.yodlee.ycc.app.utils.RestResourceImpl;
import com.yodlee.ycc.app.utils.ThreadHandler;

/**
 * @author smaji
 *
 */

@Service
public class SiteNotificationService {

	private final Logger logger = LoggerFactory.getLogger(SiteNotificationService.class);

	@Autowired
	private RestResourceImpl restResource;

	@Autowired
	private URIConstant uriConstant;
	
	@Autowired 
	private ThreadHandler threadHandler;

	/**
	 * 
	 * Service method for creating any kind of notification
	 * 
	 * @param rsession
	 * @param appId
	 * @param notification object
	 * @return
	 */
	public String createSiteNotification(String rsession, String appId, SiteNotificationFilter siteNotificationFilter) {
		logger.debug("Entering SiteNotificationService.createNotification");

		StringBuilder url = new StringBuilder(uriConstant.yslBaseUrl + uriConstant.SiteNotification_Create);

		logger.debug("url: " + url);

		String ret = restResource.post(url.toString(), rsession, siteNotificationFilter.getCustomerId(), appId,
				siteNotificationFilter.getSiteNotificationObj());
		logger.debug("Exiting SiteNotificationService.createSiteNotification");
		return ret;
	}

	

	/**
	 * 
	 * Service method for searching any kind of notification for tier1
	 * 
	 * @param rsession
	 * @param appId
	 * @param notification object
	 * @return
	 */
	public String searchSiteNotification(String rsession, String appId, SiteNotificationFilter siteNotificationFilter) {
		logger.debug("Entering SiteNotificationService.searchSiteNotification");

		StringBuilder url = new StringBuilder(uriConstant.yslBaseUrl + uriConstant.SiteNotification_Search + "?");

		boolean check = false;
		

		if (!StringUtils.isEmpty(siteNotificationFilter.getSiteId())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("siteId=" + siteNotificationFilter.getSiteId());
		}
		
		if (!StringUtils.isEmpty(siteNotificationFilter.getLabel())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("label=" + siteNotificationFilter.getLabel());
		}
		
		if (!StringUtils.isEmpty(siteNotificationFilter.getSiteNotificationId())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("notificationId=" + siteNotificationFilter.getSiteNotificationId());
		}
		
		if (!StringUtils.isEmpty(siteNotificationFilter.getBugId())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("bugId=" + siteNotificationFilter.getBugId());
		}
		
		if (!StringUtils.isEmpty(siteNotificationFilter.getNotificationSubType())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("notificationSubType=" + siteNotificationFilter.getNotificationSubType());
		}
		
		if (!StringUtils.isEmpty(siteNotificationFilter.getStatus())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("status=" + siteNotificationFilter.getStatus());
		}

		if (!StringUtils.isEmpty(siteNotificationFilter.getStartTime())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("startTime=" + siteNotificationFilter.getStartTime());
		}
		
		if (!StringUtils.isEmpty(siteNotificationFilter.getEtaTime())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("etaTime=" + siteNotificationFilter.getEtaTime());
		}

		if (!StringUtils.isEmpty(siteNotificationFilter.getCobrandId())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			if (siteNotificationFilter.getCobrandId().contains("[")) {
				url.append("cobrandId=" + siteNotificationFilter.getCobrandId()
						.substring(siteNotificationFilter.getCobrandId().indexOf("[") + 1,
								siteNotificationFilter.getCobrandId().indexOf("]"))
						.trim());
			} else {
				url.append("cobrandId=" + siteNotificationFilter.getCobrandId().trim());
			}
		}

		logger.debug("url: " + url);

		String ret = restResource.get(url.toString(), rsession, siteNotificationFilter.getCustomerId(), appId);
		logger.debug("ExitingSite NotificationService.searcSitehNotification");
		return ret;
	}

	
	/**
	 * 
	 * Service method for editing any kind of notification
	 * 
	 * @param rsession
	 * @param appId
	 * @param notification object
	 * @return
	 */
	public String editSiteNotification(String rsession, String appId, SiteNotificationFilter siteNotificationFilter) {
		logger.debug("EnteringSiteNotificationService.editSiteNotificationn");

		StringBuilder url = new StringBuilder(uriConstant.yslBaseUrl + uriConstant.SiteNotification_Edit + "/");
							
		url.append(siteNotificationFilter.getSiteNotificationId());

		logger.debug("url: " + url);

		String ret = restResource.put(url.toString(), rsession, siteNotificationFilter.getCustomerId(), appId,
				siteNotificationFilter.getSiteNotificationObj());
		logger.debug("ExitingSite NotificationService.editSiteNotificationn");
		return ret;
	}

	/**
	 * 
	 * Service method for editing any kind of notification
	 * 
	 * @param rsession
	 * @param appId
	 * @param notification object
	 * @return
	 */
	public String getSiteData(String rsession, String appId, SiteNotificationFilter siteNotificationFilter) {
		logger.debug("Entering SiteNotificationServicee.getSiteData");

		StringBuilder url = new StringBuilder(uriConstant.yslBaseUrl + uriConstant.SiteNotification_Site_Data + "/");

		url.append(siteNotificationFilter.getSiteId());

		logger.debug("url: " + url);

		String ret = restResource.get(url.toString(), rsession, siteNotificationFilter.getCustomerId(), appId);
		logger.debug("Exiting SiteNotificationService.getSiteData");
		return ret;
	}



	public String getCobrandData(String rsession, String appId, SiteNotificationFilter siteNotificationFilter) {
		logger.debug("Entering SiteNotificationServicee.getSiteData");

		String ret=null;
		try {
			ret = threadHandler.getCobrandData(rsession, appId, siteNotificationFilter);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		logger.debug("Exiting SiteNotificationService.getSiteData");
		return ret;
	}
}
