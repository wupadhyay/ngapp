/**
 * Copyright (c) 2016 Yodlee Inc. All Rights Reserved.
 *
 * This software is the confidential and proprietary information of Yodlee, Inc.
 * Use is subject to license terms.
 *
 */
package com.yodlee.ycc.app.search;

/**
 * <code>ReportSearchFilter<code> class will contain all the filter attributes
 * used for report search
 * 
 *
 */
public class ReportSearchFilter extends RequestParameters {

	private String groupBy;

	private String reportType;

	private String top;

	private String numRecords;

	private String include;

	private String timeSlot;

	private String offSetTimeSlot;

	private String providerIds;

	private String consolidatedBy;

	public String getConsolidatedBy() {
		return consolidatedBy;
	}

	public void setConsolidatedBy(String consolidatedBy) {
		this.consolidatedBy = consolidatedBy;
	}

	public String getProviderIds() {
		return providerIds;
	}

	public void setProviderIds(String providerIds) {
		this.providerIds = providerIds;
	}

	public String getGroupBy() {
		return groupBy;
	}

	public void setGroupBy(String groupBy) {
		this.groupBy = groupBy;
	}

	public String getReportType() {
		return reportType;
	}

	public void setReportType(String reportType) {
		this.reportType = reportType;
	}

	public String getTop() {
		return top;
	}

	public void setTop(String top) {
		this.top = top;
	}

	public String getNumRecords() {
		return numRecords;
	}

	public void setNumRecords(String numRecords) {
		this.numRecords = numRecords;
	}

	public String getInclude() {
		return include;
	}

	public void setInclude(String include) {
		this.include = include;
	}

	public String getTimeSlot() {
		return timeSlot;
	}

	public void setTimeSlot(String timeSlot) {
		this.timeSlot = timeSlot;
	}

	public ReportSearchFilter() {
		super();
	}

	public String getOffSetTimeSlot() {
		return offSetTimeSlot;
	}

	public void setOffSetTimeSlot(String offSetTimeSlot) {
		this.offSetTimeSlot = offSetTimeSlot;
	}

}
