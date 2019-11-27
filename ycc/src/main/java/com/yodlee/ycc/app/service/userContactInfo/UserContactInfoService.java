/**
 *
 * Copyright (c) 2018 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */

package com.yodlee.ycc.app.service.userContactInfo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.yodlee.ycc.app.constants.URIConstant;
import com.yodlee.ycc.app.search.UserContactInfoFilter;
import com.yodlee.ycc.app.utils.RestResourceImpl;

/**
 * @author sjain5
 *
 */

@Service
public class UserContactInfoService {

	private final Logger logger = LoggerFactory.getLogger(UserContactInfoService.class);

	@Autowired
	private RestResourceImpl restResource;

	@Autowired
	private URIConstant uriConstant;

	/**
	 * 
	 * Service method for creating any kind of user's contact information
	 * 
	 * @param rsession
	 * @param appId
	 * @param user     contact information object
	 * @return
	 */
	public String createUserContactInfo(String rsession, String appId, UserContactInfoFilter userContactInfoFilter) {

		logger.debug("Entering UserContactInfoService.createUserContactInfo");

		StringBuilder url = new StringBuilder(uriConstant.yslBaseUrl + uriConstant.userContactInfo_Create);

		logger.debug("url: " + url);

		String ret = restResource.post(url.toString(), rsession, userContactInfoFilter.getCustomerId(), appId,
				userContactInfoFilter.getUserContactInfoObj());
		logger.debug("Exiting UserContactInfoService.createUserContactInfo");
		return ret;
	}

	/**
	 * 
	 * Service method for searching any kind of user
	 * 
	 * @param rsession
	 * @param appId
	 * @param user     contact information object
	 * @return
	 */
	public String searchUserContact(String rsession, String appId, UserContactInfoFilter userContactInfoFilter) {
		logger.debug("Entering UserContactInfoService.searchUserContact");

		StringBuilder url = new StringBuilder(uriConstant.yslBaseUrl + uriConstant.userContactInfo_Search);

		boolean check = false;

		if (!StringUtils.isEmpty(userContactInfoFilter.getEmail())) {
			check = true;
			url.append("?email=" + userContactInfoFilter.getEmail());
		}

		if (!StringUtils.isEmpty(userContactInfoFilter.getEnvironment())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
				url.append("?");
			}
			url.append("environment=" + userContactInfoFilter.getEnvironment());
		}
		if (!StringUtils.isEmpty(userContactInfoFilter.getFirstName())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
				url.append("?");
			}
			url.append("firstName=" + userContactInfoFilter.getFirstName());
		}

		if (!StringUtils.isEmpty(userContactInfoFilter.getLastName())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
				url.append("?");
			}
			url.append("lastName=" + userContactInfoFilter.getLastName());
		}

		if (!StringUtils.isEmpty(userContactInfoFilter.getUserName())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
				url.append("?");
			}
			url.append("userName=" + userContactInfoFilter.getUserName());
		}

		if (!StringUtils.isEmpty(userContactInfoFilter.getIsYcc())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
				url.append("?");
			}
			url.append("isYcc=" + userContactInfoFilter.getIsYcc());
		}

		if (!StringUtils.isEmpty(userContactInfoFilter.getRoles())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
				url.append("?");
			}
			url.append("roles=" + userContactInfoFilter.getRoles());
		}

		if (!StringUtils.isEmpty(userContactInfoFilter.getNumRecords())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
				url.append("?");
			}
			url.append("numRecords=" + userContactInfoFilter.getNumRecords());
		}
		if (!StringUtils.isEmpty(userContactInfoFilter.getCobrandId())) {
			if (check) {
				url.append("&");
			} else {
				check = true;
				url.append("?");
			}
			if (userContactInfoFilter.getCobrandId().contains("[")) {
				url.append("cobrandId=" + userContactInfoFilter.getCobrandId()
						.substring(userContactInfoFilter.getCobrandId().indexOf("[") + 1,
								userContactInfoFilter.getCobrandId().indexOf("]"))
						.trim());
			} else {
				url.append("cobrandId=" + userContactInfoFilter.getCobrandId().trim());
			}
		}
		
	

		logger.debug("url: " + url);

		String ret = restResource.get(url.toString(), rsession, userContactInfoFilter.getCustomerId(), appId);
		logger.debug("Exiting UserContactInfoService.searchUserContact");
		return ret;

	}

	/**
	 * 
	 * Service method for editing any kind of user's contact information
	 * 
	 * @param rsession
	 * @param appId
	 * @param user     contact information object
	 * @return
	 */
	public String editUserContact(String rsession, String appId, UserContactInfoFilter userContactInfoFilter) {
		logger.debug("Entering UserContactInfoService.editUserContact");

		StringBuilder url = new StringBuilder(uriConstant.yslBaseUrl + uriConstant.userContactInfo_Edit + "/");

		url.append(userContactInfoFilter.getUserContactInfoId());

		logger.debug("url: " + url);

		String ret = restResource.put(url.toString(), rsession, userContactInfoFilter.getCustomerId(), appId,
				userContactInfoFilter.getUserContactInfoObj());
		logger.debug("Exiting UserContactInfoService.editUserContact");
		return ret;
	}

	/**
	 * 
	 * Service method for Uploading File
	 * 
	 */
	public String uploadFile(String rsession, String appId, UserContactInfoFilter userContactInfoFilter) {
		logger.debug("Entering USerContactInfoService.uploadFile");

		StringBuilder url = new StringBuilder(uriConstant.yslBaseUrl + uriConstant.userContactInfo_BulkUpload);

		logger.debug("url: " + url);

		String ret = restResource.post(url.toString(), rsession, userContactInfoFilter.getCustomerId(), appId,
				userContactInfoFilter.getUserContactInfoObj());
		logger.debug("Exiting UserContactInfoService.uploadFile");
		return ret;
	}
	
	/**
	 * 
	 * Service method for Uploading Pro-Stage Cobrand Mapping File
	 * 
	 */
	
	public String uploadCobMapping(String rsession, String appId, UserContactInfoFilter userContactInfoFilter) {
		logger.debug("Entering USerContactInfoService.uploadFile");

		StringBuilder url = new StringBuilder(uriConstant.yslBaseUrl + uriConstant.userContactInfo_CobrandMapping);

		logger.debug("url: " + url);

		String ret = restResource.post(url.toString(), rsession, userContactInfoFilter.getCustomerId(), appId,
				userContactInfoFilter.getUserContactInfoObj());
		logger.debug("Exiting UserContactInfoService.uploadFile");
		return ret;
	}

	
	/**
	 * 
	 * Service method for Fetching file history
	 * 
	 */

	public String getFileHistory(String rsession, String appId, UserContactInfoFilter userContactInfoFilter) {
		logger.debug("Entering USerContactInfoService.getFileHistory");

		StringBuilder url = new StringBuilder(uriConstant.yslBaseUrl + uriConstant.userContactInfo_FileHistory);

		logger.debug("url for file history: " + url);

		String ret = restResource.get(url.toString(), rsession, userContactInfoFilter.getCustomerId(), appId);
		logger.debug("ret values for file history" + ret);
		logger.debug("Exiting UserContactInfoService.getFileHistory");
		return ret;
	}

	/**
	 * 
	 * @param rsession
	 * @param appId
	 * @param userContactInfoFilter
	 * @return user roles
	 */

	public String getUserRole(String rsession, String appId, UserContactInfoFilter userContactInfoFilter) {
		logger.debug("Entering UserContactInfoService.getUserRole");

		StringBuilder url = new StringBuilder(uriConstant.yslBaseUrl + uriConstant.userContactInfo_userRole);

		logger.debug("url for user role: " + url);

		String ret = restResource.get(url.toString(), rsession, userContactInfoFilter.getCustomerId(), appId);
		logger.debug("ret values for use role:" + ret);
		logger.debug("Exiting UserContactInfoService.getUserRole");
		return ret;
	}

}
