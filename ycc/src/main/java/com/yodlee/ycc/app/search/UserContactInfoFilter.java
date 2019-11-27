/**
 *
 * Copyright (c) 2018 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */

package com.yodlee.ycc.app.search;

/**
 * 
 * @author sjain5
 *
 */

public class UserContactInfoFilter extends RequestParameters {

	private String userContactInfoObj;

	private String userContactInfoId;

	private String email;

	private String userName;

	private String firstName;

	private String lastName;

	private String isYcc;

	private String roles;

	private String environment;

	private String numRecords;
	

	public String getNumRecords() {
		return numRecords;
	}

	public void setNumRecords(String numRecords) {
		this.numRecords = numRecords;
	}

	public String getUserContactInfoObj() {
		return userContactInfoObj;
	}

	public void setUserContactInfoObj(String userContactInfoObj) {
		this.userContactInfoObj = userContactInfoObj;
	}

	public String getUserContactInfoId() {
		return userContactInfoId;
	}

	public void setUserContactInfoId(String userContactInfoId) {
		this.userContactInfoId = userContactInfoId;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getIsYcc() {
		return isYcc;
	}

	public void setIsYcc(String isYcc) {
		this.isYcc = isYcc;
	}

	public String getRoles() {
		return roles;
	}

	public void setRoles(String roles) {
		this.roles = roles;
	}

	public String getEnvironment() {
		return environment;
	}

	public void setEnvironment(String environment) {
		this.environment = environment;
	}
	

}
