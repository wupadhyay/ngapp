/**
 *
 * Copyright (c) 2018 Yodlee Inc. All Rights Reserved.
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
import com.yodlee.ycc.app.utils.RestResourceImpl;

/**
 * @author sjain5
 *
 */

@Service
public class NotificationService {

	private final Logger logger = LoggerFactory.getLogger(NotificationService.class);

	@Autowired
	private RestResourceImpl restResource;

	@Autowired
	private URIConstant uriConstant;

	/**
	 * 
	 * Service method for creating any kind of notification
	 * 
	 * @param rsession
	 * @param appId
	 * @param notification object
	 * @return
	 */
	public String createNotification(String rsession, String appId, NotificationFilter notificationFilter) {
		logger.debug("Entering NotificationService.createNotification");

		StringBuilder url = new StringBuilder(uriConstant.yslBaseUrl + uriConstant.Notification_Create);

		logger.debug("url: " + url);

		String ret = restResource.post(url.toString(), rsession, notificationFilter.getCustomerId(), appId,
				notificationFilter.getNotificationObj());
		logger.debug("Exiting NotificationService.createNotification");
		return ret;
	}

	/**
	 * 
	 * Service method for searching any kind of notification for tier2
	 * 
	 * @param rsession
	 * @param appId
	 * @param notification object
	 * @return
	 */
	public String searchForAllNotification(String rsession, String appId, NotificationFilter notificationFilter) {
		logger.debug("Entering NotificationService.searchNotification");

		StringBuilder url = new StringBuilder(uriConstant.yslBaseUrl + uriConstant.Notification_Search_All_Data + "?");

		boolean check = false;

		if (!StringUtils.isEmpty(notificationFilter.getCriticality())) {
			check = true;
			url.append("criticality=" + notificationFilter.getCriticality());
		}

		if (!StringUtils.isEmpty(notificationFilter.getPriority())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("priority=" + notificationFilter.getPriority());
		}
		
		if(!StringUtils.isEmpty(notificationFilter.getDependencies())) {
			if(check) {
				url.append("&");
			}else
			{	
				check=true;
			}
			url.append("dependencies="+notificationFilter.getDependencies());
		}
		
		if (!StringUtils.isEmpty(notificationFilter.getIsExportRequest())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("isExportRequest=" + notificationFilter.getIsExportRequest());
		}
		
		if (!StringUtils.isEmpty(notificationFilter.getEnvironment())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("environment=" + notificationFilter.getEnvironment());
		}
		if (!StringUtils.isEmpty(notificationFilter.getBugNum())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("bugId=" + notificationFilter.getBugNum());
		}

		if (!StringUtils.isEmpty(notificationFilter.getEndTime())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("endTime=" + notificationFilter.getEndTime());
		}

		if (!StringUtils.isEmpty(notificationFilter.getNotificationId())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("notificationId=" + notificationFilter.getNotificationId());
		}

		if (!StringUtils.isEmpty(notificationFilter.getNotificationStatus())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("statuses=" + notificationFilter.getNotificationStatus());
		}

		if (!StringUtils.isEmpty(notificationFilter.getNotificationSubType())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("notificationSubType=" + notificationFilter.getNotificationSubType());
		}

		if (!StringUtils.isEmpty(notificationFilter.getNotificationType())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("notificationTypes=" + notificationFilter.getNotificationType());
		}

		if (!StringUtils.isEmpty(notificationFilter.getTicketNum())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("serviceNowTicket=" + notificationFilter.getTicketNum());
		}

		if (!StringUtils.isEmpty(notificationFilter.getStartTime())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("startTime=" + notificationFilter.getStartTime());
		}

		if (!StringUtils.isEmpty(notificationFilter.getNotificationSubStatus())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("subStatus=" + notificationFilter.getNotificationSubStatus());
		}

		if (!StringUtils.isEmpty(notificationFilter.getCobrandId())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			if (notificationFilter.getCobrandId().contains("[")) {
				url.append("cobrandId=" + notificationFilter.getCobrandId()
						.substring(notificationFilter.getCobrandId().indexOf("[") + 1,
								notificationFilter.getCobrandId().indexOf("]"))
						.trim());
			} else {
				url.append("cobrandId=" + notificationFilter.getCobrandId().trim());
			}
		}

		logger.debug("url: " + url);

		String ret = restResource.get(url.toString(), rsession, notificationFilter.getCustomerId(), appId);
		logger.debug("Exiting NotificationService.searchNotification");
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
	public String searchNotification(String rsession, String appId, NotificationFilter notificationFilter) {
		logger.debug("Entering NotificationService.searchNotification");

		StringBuilder url = new StringBuilder(uriConstant.yslBaseUrl + uriConstant.Notification_Search + "?");

		boolean check = false;

		if (!StringUtils.isEmpty(notificationFilter.getEnvironment())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("environment=" + notificationFilter.getEnvironment());
		}
		
		if (!StringUtils.isEmpty(notificationFilter.getTitle())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("title=" + notificationFilter.getTitle());
		}
		
		if (!StringUtils.isEmpty(notificationFilter.getDescription())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("description=" + notificationFilter.getDescription());
		}
		
		if (!StringUtils.isEmpty(notificationFilter.getEndTime())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("endTime=" + notificationFilter.getEndTime());
		}
		
		if (!StringUtils.isEmpty(notificationFilter.getFromDate())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("fromDate=" + notificationFilter.getFromDate());
		}
		if (!StringUtils.isEmpty(notificationFilter.getToDate())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("toDate=" + notificationFilter.getToDate());
		}

		if (!StringUtils.isEmpty(notificationFilter.getNotificationId())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("notificationId=" + notificationFilter.getNotificationId());
		}

		if (!StringUtils.isEmpty(notificationFilter.getNotificationStatus())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("statuses=" + notificationFilter.getNotificationStatus());
		}

		if (!StringUtils.isEmpty(notificationFilter.getNotificationType())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("notificationTypes=" + notificationFilter.getNotificationType());
		}

		if (!StringUtils.isEmpty(notificationFilter.getStartTime())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			url.append("startTime=" + notificationFilter.getStartTime());
		}

		if (!StringUtils.isEmpty(notificationFilter.getCobrandId())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
			}
			if (notificationFilter.getCobrandId().contains("[")) {
				url.append("cobrandId=" + notificationFilter.getCobrandId()
						.substring(notificationFilter.getCobrandId().indexOf("[") + 1,
								notificationFilter.getCobrandId().indexOf("]"))
						.trim());
			} else {
				url.append("cobrandId=" + notificationFilter.getCobrandId().trim());
			}
		}

		logger.debug("url: " + url);

		String ret = restResource.get(url.toString(), rsession, notificationFilter.getCustomerId(), appId);
		logger.debug("Exiting NotificationService.searchNotification");
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
	public String editNotification(String rsession, String appId, NotificationFilter notificationFilter) {
		logger.debug("Entering NotificationService.editNotification");

		StringBuilder url = new StringBuilder(uriConstant.yslBaseUrl + uriConstant.Notification_Edit + "/");

		url.append(notificationFilter.getNotificationId());

		logger.debug("url: " + url);

		String ret = restResource.put(url.toString(), rsession, notificationFilter.getCustomerId(), appId,
				notificationFilter.getNotificationObj());
		logger.debug("Exiting NotificationService.editNotification");
		return ret;
	}

	/**
	 * 
	 * Service method for fetching all statuses based on type of notification
	 * 
	 * @param rsession
	 * @param appId
	 * @param notification object
	 * @return
	 */
	public String fetchNotificationStatuses(String rsession, String appId, NotificationFilter notificationFilter) {
		logger.debug("Entering NotificationService.fetchNotificationStatuses");

		StringBuilder url = new StringBuilder(uriConstant.yslBaseUrl + uriConstant.Notification_Statuses
				+ "?notificationType=" + notificationFilter.getNotificationType());

		logger.debug("url: " + url);

		String ret = restResource.get(url.toString(), rsession, notificationFilter.getCustomerId(), appId);
		logger.debug("Exiting NotificationService.fetchNotificationStatuses");
		return ret;
	}

	/**
	 * 
	 * Service method for fetching all the cobrand mapped environment details
	 * 
	 * @param rsession
	 * @param appId
	 * @param notification object
	 * @return
	 */
	public String fetchAllCobBackendFilters(String rsession, String appId, NotificationFilter notificationFilter) {
		logger.debug("Entering NotificationService.fetchAllCobBackendFilters");

		StringBuilder url = new StringBuilder(uriConstant.yslBaseUrl + uriConstant.Notification_Cob_Backend_details
				+ "?environment=" + notificationFilter.getEnvironment());

		logger.debug("url: " + url);

		String ret = restResource.get(url.toString(), rsession, notificationFilter.getCustomerId(), appId);
		logger.debug("Exiting NotificationService.fetchAllCobBackendFilters");
		return ret;
	}

	/**
	 * 
	 * Service method for getting attachment
	 * 
	 */
	public String downloadAttachment(String rsession, String appId, NotificationFilter notificationFilter) {
		logger.debug("Entering NotificationService.downloadAttachment");

		StringBuilder url = new StringBuilder(uriConstant.yslBaseUrl + uriConstant.Notification_Download + "/"
				+ notificationFilter.getAttachmentId());

		logger.debug("url: " + url);

		String ret = restResource.get(url.toString(), rsession, notificationFilter.getCustomerId(), appId);
		logger.debug("Exiting NotificationService.downloadAttachment");
		return ret;
	}

}
