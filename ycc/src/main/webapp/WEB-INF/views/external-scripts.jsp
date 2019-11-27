<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<c:set var="cp" value="${pageContext.request.contextPath}" />

<link rel=stylesheet href="/ngycc/scripts/external/bootstrap.min.css">
<link rel=stylesheet href="/ngycc/scripts/external/select.min.css">
<link rel=stylesheet href="/ngycc/scripts/external/ng-table.min.css">
<script src="/ngycc/scripts/external/jquery.min.js"></script>
<script src="/ngycc/scripts/external/angular.min.js"></script>
<script src="/ngycc/scripts/external/angular-animate.min.js"></script>
<script src="/ngycc/scripts/external/angular-ui-router.min.js"></script>
<script src="/ngycc/scripts/external/ui-bootstrap-tpls.min.js"></script>
<script src="/ngycc/scripts/external/select.min.js"></script>
<script src="/ngycc/scripts/external/ng-table.min.js"></script>
<script src="/ngycc/scripts/external/underscore-min.js"></script>

<script src="/ngycc/scripts/external/js/moment.min.js"></script>
<script src="/ngycc/scripts/external/js/bootstrap.min.js"></script>
<script src="/ngycc/scripts/external/js/bootstrap-datetimepicker.min.js"></script>
<link rel=stylesheet
	href="/ngycc/scripts/external/css/bootstrap-datetimepicker.min.css"></link>

<script src="/ngycc/scripts/external/angular-sanitize.js"></script>
<script
	src="/ngycc/scripts/external/moment-timezone-with-data-2012-2022.js"></script>
<link rel="stylesheet" href="/ngycc/scripts/external/select2.css"></link>

<script src="/ngycc/scripts/external/js/angular-base64-upload.js"></script>
<script type="text/javascript"
	src="/ngycc/scripts/external/js/tinymce.min.js"></script>

<link rel="stylesheet"
	href="/ngycc/scripts/external/js/skins/lightgray/skin.min.css">
<script type="text/javascript"
	src="/ngycc/scripts/external/js/FileSaver.js"></script>
<script type="text/javascript"
	src="/ngycc/scripts/external/js/json-export-excel.js"></script>
<script type="text/javascript"
	src="/ngycc/scripts/external/js/ng-infinite-scroll.js"></script>
	
<script type="text/javascript"
src="/ngycc/scripts/external/js/lazy-scroll.js"></script>	

<script>
	angular.module("Path", []).constant("context", {
		"path" : "${cp}"
	});
</script>
