 <%@ include file="/WEB-INF/views/includes.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title><spring:message code="alumno.titulo"/></title>
</head>
<body>
Language: <a href="?language=en">English</a> | <a href="?language=es">Español</a> | <a href="?language=ca">Catalan</a>
<br/><br/>
<spring:message code="user.logged"/>:<sec:authentication property="name"/> <sec:authentication property="authorities"/>
<br/>
<a href="logout"><spring:message code="user.logout"/></a>
<h1><spring:message code="alumno.tabletitulo"/></h1>
<sec:authorize access="hasRole('Admin')">
	<form action="alumno.do" method="POST" commandName="alumno">
		<table>
			<tr>
				<td><spring:message code="alumno.id"/></td>
				<td><input id="id" name="id"></td>
			</tr>
			<tr>
				<td><spring:message code="alumno.nombre"/></td>
				<td><input id="nombre" name="nombre"></td>
			</tr>
			<tr>
				<td><spring:message code="alumno.apellidos"/></td>
				<td><input id="apellidos" name="apellidos"></td>
			</tr>
			<tr>
				<td><spring:message code="alumno.correo"/></td>
				<td><input id="correo" name="correo"></td>
			</tr>
			<tr>
				<td colspan="2"></td>
				<input type="submit" name="action" value="Add"/>
				<input type="submit" name="action" value="Edit"/>
				<input type="submit" name="action" value="Delete"/>
				<input type="submit" name="action" value="Search"/>
			</tr>
		</table>
	</form>	
</sec:authorize>

<br>
<table border="1">
	<tr><spring:message code="alumno.id"/></tr>
	<tr><spring:message code="alumno.nombre"/></tr>
	<tr><spring:message code="alumno.apellidos"/></tr>
	<tr><spring:message code="alumno.correo"/></tr>
	<c:forEach items="${alumnoList}" var="a">
	<tr>
		<td>${a.id}</td>
		<td>${a.nombre}</td>
		<td>${a.apellidos}</td>
		<td>${a.correo}</td>
	</tr>
	
	</c:forEach>
	
</table>
</body>
</html>