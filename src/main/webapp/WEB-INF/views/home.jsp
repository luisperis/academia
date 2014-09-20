<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>

<%@ page import="org.springframework.web.servlet.support.RequestContext" %>
<% String lang = (new RequestContext(request)).getLocale().getLanguage(); %>

<c:set var="nUnread" value="${notifier.NUnreadMessages}" />

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html lang="<%= lang %>">
	<head>
		<meta charset="utf-8">
		<!--<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">-->

		<title> </title>
		<meta name="description" content="" />
 		<meta name="author" content="" />
			
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
		
		<!-- Basic Styles -->
		
		<link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin/bootstrap.min.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin/font-awesome.min.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin/jquery.dataTables.css" />
		
		<!-- SmartAdmin Styles : Please note (smartadmin-production.css) was created using LESS variables -->
		<link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin/smartadmin-production.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin/smartadmin-skins.css" />
		
		<link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin/jquery.imgareaselect.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin/jquery.simple-dtpicker.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin/your_style.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin/shop.css" />
		<link rel="stylesheet" type="text/css" media="screen" href="css/smartadmin/error.css" />
		
		<!-- FAVICONS -->
		<link rel="shortcut icon" href="images/smartadmin/favicon/favicon.ico" type="image/x-icon" />
		<link rel="icon" href="images/smartadmin/favicon/favicon.ico" type="image/x-icon" />

		<!-- GOOGLE FONT -->
		<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700" />

		<!-- Specifying a Webpage Icon for Web Clip 
			 Ref: https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html -->
		<link rel="apple-touch-icon" href="images/smartadmin/splash/sptouch-icon-iphone.png" />
		<link rel="apple-touch-icon" sizes="76x76" href="images/smartadmin/splash/touch-icon-ipad.png" />
		<link rel="apple-touch-icon" sizes="120x120" href="images/smartadmin/splash/touch-icon-iphone-retina.png" />
		<link rel="apple-touch-icon" sizes="152x152" href="images/smartadmin/splash/touch-icon-ipad-retina.png" />
		
		<!-- iOS web-app metas : hides Safari UI Components and Changes Status Bar Appearance -->
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black" />
		
		<!-- Startup image for web apps -->
		<link rel="apple-touch-startup-image" href="images/smartadmin/splash/ipad-landscape.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape)" />
		<link rel="apple-touch-startup-image" href="images/smartadmin/splash/ipad-portrait.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait)" />
		<link rel="apple-touch-startup-image" href="images/smartadmin/splash/iphone.png" media="screen and (max-device-width: 320px)" />

		<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
	
	</head>
	<body class="smart-style-3">
		
		<div id="loading-mask" style="display:none;"></div>
		
		<header id="header">
			<div id="logo-group">

				<span id="logo-2me">
					<img src="images/2me/logo.png" alt="2me" />
				</span>

			</div>
			
			<div class="pull-right">
				
				<div id="events-menu" class="btn-header pull-right">
					<span> <a href="javascript:void(0);" title="Eventos"><i class="fa fa-bell"></i></a> </span>
				</div>
				
				<div id="hide-menu" class="btn-header pull-right">
					<span> <a href="javascript:void(0);" title="Colapsar menú"><i class="fa fa-reorder"></i></a> </span>
				</div>

				<div id="logout" class="btn-header transparent pull-right">
					<span>
						<a href="logout" title="Salir" data-logout-title="Salir" data-logout-msg="¿Estas seguro que quieres cerrar la sesión?">
							<i class="fa fa-sign-out"></i>
							<spring:message code="user.logout"/>
						</a>
					</span>
				</div>

				<div id="fullscreen" class="btn-header transparent pull-right">
					<span> <a href="javascript:void(0);" onclick="launchFullscreen(document.documentElement);" title="Full Screen"><i class="fa fa-fullscreen"></i></a> </span>
				</div>

				<ul class="header-dropdown-list hidden-xs">
					<li>
						<a href="#" class="dropdown-toggle" data-toggle="dropdown"> 
							<img alt="<%= lang %>" src="images/smartadmin/flags/<%= lang %>.png" />
							<span> <%= lang %> </span> <i class="fa fa-angle-down"></i>
						</a>
						<ul class="dropdown-menu pull-right">
							<li>
								<a href="?lang=en"><img alt="EN" src="images/smartadmin/flags/en.png" /> English</a>
							</li>
							<li>
								<a href="?lang=es"><img alt="ES" src="images/smartadmin/flags/es.png" /> Spanish</a>
							</li>
						</ul>
					</li>
				</ul>

			</div>

		</header>
		<!-- END HEADER -->

		<!-- Left panel : Navigation area -->
		<aside id="left-panel">

			<nav>
				<ul>
					<li>
						<a href="manage/dashboard">
							<i class="fa fa-lg fa-fw fa-home"></i>
							<span class="menu-item-parent">Inicio</span>
						</a>
					</li>
					<li>
						<a href="manage/alumnos">
							<i class="fa fa-lg fa-fw fa-info"></i>
							<span class="menu-item-parent">Alumnos</span>
						</a>
					</li>
					<li>
						<a href="manage/tutores">
							<i class="fa fa-lg fa-fw fa-user"></i>
							<span class="menu-item-parent">Tutores</span>
						</a>
					</li>
					<li>
						<a href="manage/profesores">
							<i class="fa fa-lg fa-fw fa-group"></i>
							<span class="menu-item-parent">Profesores</span>
						</a>
					</li>
					<li>
						<a href="manage/cursos">
							<i class="fa fa-lg fa-fw fa-credit-card"></i>
							<span class="menu-item-parent">Cursos</span>
						</a>
				</ul>
				
				<br/>
				
			</nav>
			<span class="minifyme"> <i class="fa fa-arrow-circle-left hit"></i> </span>

		</aside>
		<!-- END NAVIGATION -->
		
		<div id="events-box" style="display:none;">
		
			<div id="header-events-box">
			
				<h6>Últimas Operaciones</h6>
				
				<hr/>
				
			</div>
			<div id="content-events-box">
			
				<ul id="content-events-box-ul">
				
					<li>
						Archiles ha enviado 1000 mensajes
						<hr/>
					</li>
					<li>
						Has recibido una notificación
						<hr/>
					</li>
					<li>
						Has recibido una notificación
						<hr/>
					</li>
				</ul>
			
			</div>
		
		</div>
		
		<!-- MAIN PANEL -->
		<div id="main" role="main">

			<div id="ribbon">

				<span class="ribbon-button-alignment">
				
					<a class="btn btn-ribbon" href="javascript:window.history.back();">
						<i class="fa fa-chevron-left"></i>
						Atrás
					</a>
					
				</span>

				<ol class="breadcrumb">
					<!-- This is auto generated -->
				</ol>

			</div>

			<div id="content">

			</div>

		</div>
		<!-- END MAIN PANEL -->

		<!-- MODAL WIDGET -->
		<div id="modal-view-message" class="modal fade" tabindex='-1'>
			<div class="modal-dialog" style="width: 90%">
				<div id="modal-view-message-body" class="modal-content">
					
				</div>
			</div>
		</div>
		<!-- END SHORTCUT AREA -->

		<!-- Link to Google CDN's jQuery + jQueryUI; fall back to local -->
		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min.js"></script>
		<script>
			if (!window.jQuery) {
				document.write('<script type="text/javascript" src="js/smartadmin/libs/jquery-2.0.2.min.js"><\/script>');
			}
		</script>

		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
		<script>
			if (!window.jQuery.ui) {
				document.write('<script type="text/javascript" src="js/smartadmin/libs/jquery-ui-1.10.3.min.js"><\/script>');
			}
		</script>
		
		<% if (lang.equals("es")) { %>
			<script>
				document.write('<script type="text/javascript" src="js/smartadmin/languages/es/jquery-ui-1.10.3.min.js"><\/script>');
			</script>
		<% } %>
		
		<!-- BOOTSTRAP JS -->
		<script type="text/javascript" src="js/smartadmin/bootstrap/bootstrap.min.js"></script>
		
		<!-- BOOTSTRAP JS -->
		<script type="text/javascript" src="js/smartadmin/bootstrap/ckeditor.fix.js"></script>
		
		<!-- CUSTOM NOTIFICATION -->
		<script type="text/javascript" src="js/smartadmin/notification/SmartNotification.min.js"></script>

		<!-- JARVIS WIDGETS -->
		<script type="text/javascript" src="js/smartadmin/smartwidgets/jarvis.widget.min.js"></script>

		<!-- EASY PIE CHARTS -->
		<script type="text/javascript" src="js/smartadmin/plugin/easy-pie-chart/jquery.easy-pie-chart.min.js"></script>

		<!-- SPARKLINES -->
		<script type="text/javascript" src="js/smartadmin/plugin/sparkline/jquery.sparkline.min.js"></script>

		<!-- JQUERY VALIDATE -->
		<script type="text/javascript" src="js/smartadmin/plugin/jquery-validate/jquery.validate.min.js"></script>

		<!-- JQUERY MASKED INPUT -->
		<script type="text/javascript" src="js/smartadmin/plugin/masked-input/jquery.maskedinput.min.js"></script>

		<!-- JQUERY SELECT2 INPUT -->
		<script type="text/javascript" src="js/smartadmin/plugin/select2/select2.min.js"></script>

		<!-- JQUERY UI + Bootstrap Slider -->
		<script type="text/javascript" src="js/smartadmin/plugin/bootstrap-slider/bootstrap-slider.min.js"></script>

		<!-- JQUERY UI + Timepicker -->
		<script type="text/javascript" src="js/smartadmin/plugin/jquery.simple-dtpicker/jquery.simple-dtpicker.js"></script>
		
		<!-- browser msie issue fix -->
		<script type="text/javascript" src="js/smartadmin/plugin/msie-fix/jquery.mb.browser.min.js"></script>

		<!-- FastClick: For mobile devices: you can disable this in app.js -->
		<script type="text/javascript" src="js/smartadmin/plugin/fastclick/fastclick.js"></script>

		<!-- AJAX FORMS: AjaxSubmit -->
		<script type="text/javascript" src="js/smartadmin/plugin/jquery-form/jquery-form.min.js"></script>
		
		<!-- Img Area Select -->
		<script type="text/javascript" src="js/smartadmin/plugin/jquery.imgareaselect/jquery.imgareaselect.min.js"></script>
		
		<!-- Rating -->
		<script type="text/javascript" src="js/smartadmin/plugin/jquery.raty/jquery.raty.js"></script>
	
		<!-- CKEditor -->
		<script type="text/javascript" src="js/ckeditor/ckeditor.js"></script>
		<script type="text/javascript" src="js/ckeditor/adapters/jquery.js"></script>
	
		<!-- XEditable -->
		<script type="text/javascript" src="js/smartadmin/plugin/x-editable/moment.min.js"></script>
		<script type="text/javascript" src="js/smartadmin/plugin/x-editable/x-editable.min.js"></script>
		<script type="text/javascript" src="js/smartadmin/plugin/typeahead/typeahead.min.js"></script>
		<script type="text/javascript" src="js/smartadmin/plugin/typeahead/typeaheadjs.min.js"></script>
	
		<!-- CALENDAR -->
		<% if (lang.equals("es")) { %>
			<script>
				document.write('<script type="text/javascript" src="js/smartadmin/plugin/fullcalendar/jquery.fullcalendarES.min.js"><\/script>');
			</script>
		<% } else { %>
			<script>
				document.write('<script type="text/javascript" src="js/smartadmin/plugin/fullcalendar/jquery.fullcalendar.min.js"><\/script>');
			</script>
		<% } %>
		<%-- <script type="text/javascript" src="js/smartadmin/plugin/datatables/jquery.dataTables-cust.js"></script> --%>
		<script type="text/javascript" src="js/smartadmin/plugin/datatables/jquery.dataTables.js"></script>
		<script type="text/javascript" src="js/smartadmin/plugin/datatables/dataTables.colReorder.min.js"></script>
		<script type="text/javascript" src="js/smartadmin/plugin/datatables/FixedColumns.min.js"></script>
		<script type="text/javascript" src="js/smartadmin/plugin/datatables/ColVis.min.js"></script>
		<script type="text/javascript" src="js/smartadmin/plugin/datatables/ZeroClipboard.js"></script>
		<script type="text/javascript" src="js/smartadmin/plugin/datatables/media/js/TableTools.min.js"></script>
		<script type="text/javascript" src="js/smartadmin/plugin/datatables/jquery.datetime.sort.js"></script>
		<script type="text/javascript" src="js/smartadmin/plugin/datatables/DT_bootstrap.js"></script>
		<script type="text/javascript" src="js/smartadmin/plugin/datatables/fnReloadAjax.js"></script>
		<script type="text/javascript" src="js/smartadmin/plugin/datatables/fnFilterOnReturn.js"></script>
		<script type="text/javascript" src="js/smartadmin/plugin/datatables/rowGrouping.js"></script>
		<script type="text/javascript" src="js/public/jquery.xml2json.js"></script>
		
		
		<!--[if IE 7]>

		<h1>Your browser is out of date, please update your browser by going to www.microsoft.com/download</h1>

		<![endif]-->
		
		<script src="js/smartadmin/datatables.js"></script>
		<script src="js/smartadmin/ajax.js"></script>
		
		<script src="js/smartadmin/app.js"></script>
		
<%-- 		<jsp:include page="websocket/websocket.jsp" /> --%>

		
		<!-- Your GOOGLE ANALYTICS CODE Below -->
		<script type="text/javascript">
		
		  var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', 'UA-XXXXXXXX-X']);
		  _gaq.push(['_trackPageview']);
		
		  (function() {
		    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
		    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
		    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();
		
 		</script>

	</body>

</html>