
/*	// Local System Find JsonFormat 
	$(function() {
		getAttributesDataJson();
		getMeasurementDataJson();
		getProductDataJson();
		getCategoriesDataJson();
	});
	
	
	
	function getMeasurementDataJson()
	{
		var dataToSend = {};
		dataToSend["secret_key"] = "4TPD6PI91";
		var appurltemps="http://tailorraniapp.stavyah.com/api/measurements/measurementsJson"
			$.ajax({
				type : 'POST',
				url: appurltemps,
				data : dataToSend,
				success: successCBMeasurementsFn,
				error: commonErrorCallback
			});
	}
	
	function getProductDataJson(){
		var dataToSend = {};
		dataToSend["secret_key"] = "4TPD6PI91";
		var appurltemps="http://tailorraniapp.stavyah.com/api/products/productsJson"
			$.ajax({
				type : 'POST',
				url: appurltemps,
				data : dataToSend,
				success: successCBMeasurementsFn,
				error: commonErrorCallback
			});
	}
	
	function getCategoriesDataJson(){
		var dataToSend = {};
		dataToSend["secret_key"] = "4TPD6PI91";
		var apiCallUrl="http://tailorraniapp.stavyah.com/api/categories/categoriesJson"
			$.ajax({
				type : 'POST',
				url: apiCallUrl,
				data : dataToSend,
				success: successCBMeasurementsFn,
				error: commonErrorCallback
			});
	}
	
	function getAttributesDataJson(){
		var dataToSend = {};
		dataToSend["secret_key"] = "4TPD6PI91";
		var appurltemps="http://tailorraniapp.stavyah.com/api/attributes/attributesJson"
			$.ajax({
				type : 'POST',
				url: appurltemps,
				data : dataToSend,
				success: successCBMeasurementsFn,
				error: commonErrorCallback
			});
	}
*/

$( document ).on( "mobileinit", function() {
    // Make your jQuery Mobile framework configuration changes here!
	 $.support.cors = true;
     $.mobile.allowCrossDomainPages = true;
     
     jQuery.mobile.phonegapNavigationEnabled = true;
     jQuery.mobile.defaultDialogTransition = "pop";
     jQuery.mobile.defaultPageTransition = "none";
      
     jQuery.mobile.loader.prototype.options.text = "loading";
     jQuery.mobile.loader.prototype.options.textVisible = true;
     jQuery.mobile.loader.prototype.options.theme = "a";
     
     $.mobile.toolbar.prototype.options.updatePagePadding = false;
     $.mobile.toolbar.prototype.options.hideDuringFocus = "";
     $.mobile.toolbar.prototype.options.tapToggle = false;
});

var connectionType;
var appName='Tailor Rani';

var rightPanelObj = '<div id="menu-wrapper">'+
							'<div class="menu-title">'+
						    	'<span>SETTING</span>'+
						    '</div>'+
						
							'<ul class="menu">'+
							
								'<li class="profile-detail person_details_right_panel">'+
									'<div class="person_details">'+
										'<div class="circular">'+'</div>'+
										'<span class="details-data name">'+window.localStorage["name"]+'</span>'+
									'</div>'+
									'<div class="sub_info">'+
										'<img src="img/icons/email118.png" alt="email">'+'</a>'+
										'<span class="email details-data">'+window.localStorage["username"]+'</span>'+
									'</div>'+
									'<div class="sub_info">'+
										'<img src="img/icons/contact1.png" alt="contacts">'+'</a>'+
										'<span class="contact_number details-data">'+window.localStorage["mobile"]+'</span>'+
									'</div>'+
								'</li>'+
								
								'<li class="icon notification">'+
									'<a href="#notification-page" data-rel="close" >'+
										'<span class="menu-li-title">Notifications</span>'+
									'</a>'+
								'</li>'+
								'<li class="icon logout">'+
									'<a href="#" onclick="doLogout();" data-rel="close">'+
										'<span class="menu-li-title">Logout</span>'+
									'</a>'+
								'</li>'+
							'</ul>'+
						'</div>';

var leftPanelObjEmpty = '<div id="menu-wrapper">'+			
								'<div class="menu-title">'+
							    	'<span>MENU</span>'+
							    '</div>'+
								'<ul class="menu">'+	
								'</ul>'+
							'</div>';
var leftPanelObj = '<div id="menu-wrapper">'+			
						'<div class="menu-title">'+
					    	'<span>MENU</span>'+
					    '</div>'+
						'<ul class="menu">';	
var leftPanelObjForTailor= 					
							'<li class="icon desciplines">'+
								'<a href="#" onclick="getSample();" data-rel="close">'+
									'<span class="menu-li-title">Sample Link</span>'+
									'<img class="menu-li-arrow" src="img/icons/arrow-forward.png" alt="">'+
								'</a>'+
							'</li>';

var ajaxCallGet = "GET";
var ajaxCallPost = "POST";
var ajaxCallUnset = "GET";
var dynPanelCount = 1,
dynPanelBtnCount = 1;
var noDataFoundMsg = "No data found.";
//$(document).one('pagebeforecreate', function () {});

function panelsInitialization(initLeftPanelFlag, initRightPanelFlag, roleId){
	dynPanelCount = 1;
	dynPanelBtnCount = 1;
    
	$.mobile.pageContainer.find("[data-role=page]").each(function () {
		var currPanelObj = $(this).find(".st-leftPanel");
		var panelFoundFlag = currPanelObj.length;
		
		if($(this).attr("id") == "login-page"){
			if(panelFoundFlag == 0){
				var leftPanelDynObj='<div id="leftPanel' + dynPanelCount + '" class="panel left st-leftPanel" data-role="panel" data-position="left" data-display="push"></div>';
		        var rightPanelDynObj = '<div id="rightPanel' + dynPanelCount + '"  class="panel right st-rightPanel" data-role="panel" data-position="right" data-display="push"></div>';
		        $(this).prepend(leftPanelDynObj);
		        $(this).prepend(rightPanelDynObj);
			}    
		}
		else{
			if(panelFoundFlag == 0){
				var leftPanelDynObj="";
		        leftPanelDynObj += '<div id="leftPanel' + dynPanelCount + '" class="panel left st-leftPanel" data-role="panel" data-position="left" data-position-fixed="true" data-display="push" >';
		        
		        leftPanelDynObj += leftPanelObj + leftPanelObjForTailor;
		        leftPanelDynObj += '</ul>'+'</div>'+'</div>';
		        
		        var rightPanelDynObj = '<div id="rightPanel' + dynPanelCount + '"  class="panel right st-rightPanel" data-role="panel" data-position="right" data-position-fixed="true" data-display="overlay" >'+
		        						rightPanelObj + '</div>';
		        
		        $(this).prepend(leftPanelDynObj);
		        $(this).prepend(rightPanelDynObj);
			}
			else{
				console.log("panel--"+$(this).attr("id")+"---"+currPanelObj.find(".ui-panel-inner").length);
				//if(roleId==0){
					currPanelObj.find("#menu-wrapper .menu").html(leftPanelObjForTailor);
					if(currPanelObj.find(".ui-panel-inner").length == 0){
						currPanelObj.find(".ui-panel-inner ul.menu").html(leftPanelObjForTailor);
					}
		        //}
			}
	        dynPanelCount++;
	        
	        var btnFoundFlag = $(this).find("[data-role=header] .st-leftPanel-btn").length;
	        if(btnFoundFlag == 0){
	        	var leftPanelDynBtn='<a href="#leftPanel' + (dynPanelBtnCount) + '" data-theme="none" data-inline="true" class="ui-btn ui-btn-left st-leftPanel-btn edit-logo" title="Menu">'+
	    		'<img src="img/edit-sm-logo.png" alt="logo" /></a>';
	
	    		var rightPanelDynBtn='<div class="ui-btn-right right-space">'+
			    							'<a href="#notification-page" class="ui-btn ui-shadow ui-corner-all st-rightPanel-btn no-border margin-right notification-count-link"  title="Notification"><span class="">0</span></a>'+
			    							'<a href="#rightPanel' + (dynPanelBtnCount) + '" class="ui-btn ui-corner-all ui-icon-gear ui-btn-icon-notext st-rightPanel-btn no-border"  title="Setting"> </a>'+
			    						'</div>';
	    		$(this).find("[data-role=header]").append(leftPanelDynBtn);
	    		$(this).find("[data-role=header]").append(rightPanelDynBtn);
	        }
			dynPanelBtnCount++;	
		}	
    }); 
}

$(document).on("pageinit", function () {
    
    /* Click Function 
	$('.mb-student-links li a').click(function(){
		return false;
	});
	*/
});

//var appUrl='http://192.168.1.11:8080/TailorRani/appEntries.php';
var appUrl = '';
var appRequiresWiFi='This action requires internet.';
var serverBusyMsg='Server is busy, please try again later.';
var mData={};
var db= null;
var pushNotification;

var app = {
    SOME_CONSTANTS : false,  // some constant
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        this.initFastClick();
    },
	
    // Bind Event Listeners Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    initFastClick : function() {
        window.addEventListener('load', function() {
            FastClick.attach(document.body);
        }, false);
    },
    // Phonegap is now ready...
    onDeviceReady: function() {
        document.addEventListener("backbutton", onBackKeyDown, false);
        
        if(window.localStorage["gcmregistrationId"] === undefined ) {
			window.localStorage["gcmregistrationId"] = "";
		}
		pushNotification = window.plugins.pushNotification;
		try{
        	pushNotification = window.plugins.pushNotification;
        	pushNotification.register(successHandler, errorHandler, {"senderID":"329763220550","ecb":"onNotification"});		// required!
        }
		catch(err){
			var txt="There was an error on this page.\n\n"; 
			txt+="Error description: " + err.message + "\n\n"; 
			console.log(txt); 
		}
		
        if(window.localStorage["appUrl"] === undefined ) {
        	window.localStorage["appUrl"] = '';
        	//window.localStorage["customCode"] = '';
        }
        else{
        	//appUrl=window.localStorage["appUrl"];
        	//checkPreAuth();
        }	
        
        console.log("DB CALL");
        db = window.sqlitePlugin.openDatabase({name: "tailorrani.db", location: 2});
		//db.transaction(initializeDB, errorCB, successCB);
        
		// FIXME PUT CONDITIONS
		// LOAD DATA FROM SERVER
		// UPDATE TO SERVER
		// UPDATE DATA FROM SERVER
		window.localStorage["dbreadyflag"] = 0;
		loadDataFromServer();
    },
};

//handle GCM notifications for Android
function onNotification(e) {
    switch( e.event ){
        case 'registered':
			if ( e.regid.length > 0 ){
				// Your GCM push server needs to know the regID before it can push to this device
				// here is where you might want to send it the regID for later use.
				console.log("regID = " + e.regid);
				window.localStorage["gcmregistrationId"] = e.regid;
			}
        break;
        
        case 'message':
        	// if this flag is set, this notification happened while we were in the foreground.
        	// you might want to play a sound to get the user's attention, throw up a dialog, etc.
        	if (e.foreground){
        		//console.log("INLINE NOTIFICATION");
			    // on Android soundname is outside the payload. 
			}
			else{	
				// otherwise we were launched because the user touched a notification in the notification tray.
				if (e.coldstart){}
					//console.log("COLDSTART NOTIFICATION");
				else{}
					//console.log("BACKGROUND NOTIFICATION");
			}
        	var dataNotifyObj = '<li>'+
									'<div class="main-content">'+
										'<div class="feat_small_icon">'+
											'<i class="fa fa-bell-o"></i>'+
										'</div>'+
										'<div class="feat_small_details">'+
											'<h5> '+ e.payload.message +' </h5>'+
											'<a href="#" class="ui-link"> '+getTodayDate();+' </a>'+
										'</div>'+
									'</div>'+	
								'</li>';
			var $notificationUlObj = $("#notification-page").find("ul.features_list_detailed");
        	$notificationUlObj.append(dataNotifyObj);
        	
        	var currentNotificationCount = $(".notification-count-link span").html();
        	var currentNotificationCountNew = parseInt(currentNotificationCount) + 1;
        	$(".notification-count-link span").html(currentNotificationCountNew);
        	$(".notification-count-link").show();        	
			//console.log(e.payload.message+"---"+e.payload.msgcnt);
            //android only
        	break;
        
        case 'error':
			 console.log(e.msg);
			 break;
        
        default:
		 	console.log(" Unknown, an event was received and we do not know what it is");
        	break;
    }
}

function successHandler (result) {
    console.log(result);
}

function errorHandler (error) {
    console.log(error);
}

function showModal(){
  $('body').append("<div class='ui-loader-background'> </div>");
  $.mobile.loading( "show" );
}

function hideModal(){
	 $(".ui-loader-background").remove();
	 $.mobile.loading( "hide" );
}

function onBackKeyDown() {
	if($.mobile.activePage.is('#login-page')){
        showExitDialog();
    }
	else if($.mobile.activePage.is('#home-page')){
        /* 
        Event preventDefault/stopPropagation not required as adding backbutton
         listener itself override the default behaviour. Refer below PhoneGap link.
       */
       //e.preventDefault();
       showExitDialog();
   }
	else if($.mobile.activePage.is('#page-2')){
       $.mobile.changePage('#home-page','slide');
   }
	else{
		$.mobile.changePage('#home-page','slide');
		//window.history.back();
   }
}

function checkConnection() {
	
	connectionType="WiFi connection";//For Testing
	return connectionType;
	
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
    return states[networkState];
}

function checkPreAuth() {
	connectionType=checkConnection();
	if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
		var form = $("#loginForm");
		
		if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined && window.localStorage.getItem("user_logged_in")==1) {
			$("#username", form).val(window.localStorage["username"]);
			$("#password", form).val(window.localStorage["password"]);
			handleLogin();
		}
	}
	else{
		navigator.notification.alert(appRequiresWiFi, exitAppForcefully, appName,'Ok');
	}
}

function logout() {
	window.localStorage["password"] = '';
	window.localStorage["user_logged_in"] = 0;
	window.localStorage["ID"] = '';
	window.localStorage["permissions"] = '';
	window.localStorage["email"] = '';
	var form = $("#loginForm");
	$("#username", form).val(window.localStorage["username"]);
	$("#password", form).val('');
	$(".schoolCodeContainer").hide();
	$(".loginFormContainer").show();
	$.mobile.changePage('#login-page','slide');
}

function gotoHome(){
	$.mobile.changePage('#home-page','slide');
}

function gotoAttributePageDiv(){
	$.mobile.changePage('#selection-page','slide');
}

function gotoMeasurementPageDiv(){
	$.mobile.changePage('#measurement-page','slide');
}

function gotoCustomerPageDiv(){
	
	$.mobile.changePage('#customer-confirmation-page','slide');
}

function gotoOrderPageDiv(){
	$.mobile.changePage('#order-report-page','slide');
}


function showExitDialog() {
    navigator.notification.confirm(
            ("Do you want to Exit?"), // message
            alertexit, // callback
            appName, // title
            'YES,NO' // buttonName
    );
}

//Call exit function
function alertexit(button){
    if(button=="1" || button==1){
        //device.exitApp();
        navigator.app.exitApp();
    }
}

function doLogout() {
	connectionType=checkConnection();
	if(connectionType=="Unknown connection" || connectionType=="No network connection"){
		navigator.notification.alert('Logout requires active internet connection', alertConfirm, appName, 'Ok');
	}
	else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
		showLogoutDialog();
	}
}

function alertConfirm(buttonIndex){
	// function for alert having no actions
}

function exitAppForcefully(buttonIndex){
	//Call exit function
    if(button=="1" || button==1){
        navigator.app.exitApp();
    }
}

function showLogoutDialog() {
    navigator.notification.confirm(
            ("Are you sure to Logout?"), // message
            alertlogout, // callback
            appName, // title
            'YES,NO' // buttonName
    );
}

//Call logout function
function alertlogout(button){
    if(button=="1" || button==1){
    	logout();
    }
}

function alertCustomMsg(msg){
	navigator.notification.alert(msg, alertConfirm, appName, 'Ok');	
}

function openPrivacyPolicyExternalApp(){
	var url="http://www.edit-ims.com/privacypolicy.html";
	navigator.app.loadUrl(url, { openExternal:true });
}

function handleLogin() {
	var form = $("#loginForm");
	//disable the button so we can't resubmit while we wait
	$("#submitButton",form).attr("disabled","disabled");
	var u = $("#username", form).val();
	var p = $("#password", form).val();
	
	// Default test login data
	u='tailor1';
	p='tailor'; 
	
	if(u != '' && p!= '') {
		connectionType=checkConnection();
		
		var loginData={};
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			if(window.localStorage["user_logged_in"] ==1) {
				navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
				//$.mobile.changePage('#home-page',{ transition: "slideup"});
			}
			else{
				navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
			}	
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			showModal();
			loginData.username=u;
			loginData.password=p;
			//loginData.gcmregdid = window.localStorage["gcmregistrationId"];
			loginData.gcmregdid = "reg";//For Testing
			
			$.ajax({
				//type : 'POST',
				url:appUrl,
				data : {"action":"login","loginData":JSON.stringify(loginData), "mData":JSON.stringify(mData) },
				success:function(data){
					var responseJson=jQuery.parseJSON(data);
					var responseMessage=responseJson["msg"];
					if(responseJson.statusCode == "0" ){
						//var appUserData=responseJson.appUserData;
						window.localStorage["username"] = u;
						window.localStorage["password"] = p;
						window.localStorage["user_logged_in"] = 1;
											
						if (window.localStorage.getItem("permissions") === null ) {
							window.localStorage["permissions"] = '';
						}
						
						var loginDataResponse=responseJson["loginDataResponse"];
						window.localStorage["name"] = loginDataResponse["name"];
						window.localStorage["userRoleId"] = loginDataResponse["userRoleId"];
						window.localStorage["userRoleName"] = loginDataResponse["userRoleName"];
						window.localStorage["userRoleNameSimple"] = "";// loginDataResponse["userRoleNameSimple"]; // FIXME
						
						var allData=responseJson["allData"];
						
						if(loginDataResponse["userRoleId"]==4 || loginDataResponse["userRoleId"]==9){ // 4= Parent Role, 9= Student Role
							
							$("#staff_homepage").hide();
							$("#student_homepage").show();
							
							var studData= allData["jsonObjStudData"];
							
							var studName=studData["name"];
							var studMobileNo=studData["mobileNumber"];
							var studentEmail=studData["studentEmail"];
							var age=studData["age"];
							var gender=studData["gender"];
							
							var userImgSrc = "img/avatars/avatar-male.png";
							var studImage = studData["image"];
							if(gender){
								gender='Male';
								userImgSrc = "img/avatars/avatar-male.png";
							}else{
								gender='Female';
								userImgSrc = "img/avatars/avatar-female.png";
							}
							
							var addressOne=studData["addressOne"];
							var addressTwo=studData["addressTwo"];
							var studContactNo=studData["tailorContactNo"];
							
						}
						
						// panelsInitialization(true, true, loginDataResponse["userRoleId"]);
						$.mobile.changePage('#home-page',{ transition: "slideup"});
					}else{
						window.localStorage["password"] = '';
						window.localStorage["user_logged_in"] = 0;
						window.localStorage["appUserData"] = '';
						
						window.localStorage["email"] = '';
						
						var form = $("#loginForm");
						$("#username", form).val(window.localStorage["username"]);
						$.mobile.changePage('#login-page','slide');
						
						navigator.notification.alert(responseMessage,		//'Invalid Credentials, please try again.',
						    alertConfirm, appName, 'Ok');
					}
				hideModal();
			   },
			   error:function(data,t,f){
				   hideModal();
				   navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
				   var responseJson = $.parseJSON(data);
				   if(responseJson.status==404){
					   navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
				   }
			   }
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		$("#submitButton").removeAttr("disabled");
	}
	else{
		navigator.notification.alert('You must enter a username and password.', alertConfirm, appName, 'Ok');
		$("#submitButton").removeAttr("disabled");
	}
	return false;
}

function getRandomNumber(){
	var minimumNum=1;
	var maximumNum=74;
	var randomNum = Math.floor(Math.random() * (maximumNum - minimumNum + 1)) + minimumNum;
	return (randomNum-1);
}

function refreshSelect(ele,currentValue){
	// Grabbing a select field
	var el = $(ele);
	// Select the relevant option, de-select any others
	if(currentValue!=""){
		el.val(currentValue).attr('selected', true).siblings('option').removeAttr('selected');
	}
	// Initialize the selectmenu
	el.selectmenu();
	// jQM refresh
	el.selectmenu("refresh", true);
}

/** 
 * Convert seconds to hh-mm-ss format.
 * @param {number} totalSeconds - the total seconds to convert to hh- mm-ss
**/
function secondsTohhmm(totalSeconds) {
  var hours   = Math.floor(totalSeconds / 3600);
  var minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
  //var seconds = totalSeconds - (hours * 3600) - (minutes * 60);
  // round seconds
  //seconds = Math.round(seconds * 100) / 100

  var result = (hours < 10 ? "0" + hours : hours);
      result += ":" + (minutes < 10 ? "0" + minutes : minutes);
      //result += ":" + (seconds  < 10 ? "0" + seconds : seconds);
  return result;
}

function getTodayDate(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1;//January is 0, so always add + 1

	var yyyy = today.getFullYear();
	if(dd<10){dd='0'+dd}
	if(mm<10){mm='0'+mm}
	//var todayString = yyyy+'-'+mm+'-'+dd;
	var todayString = dd + '/' +mm + '/' + yyyy;
	return todayString;
}

function currentDateTime() {
	var currentdate = new Date();
	var formattedSeconds=currentdate.getSeconds();
	if(formattedSeconds < 10){
		formattedSeconds = "0"+formattedSeconds;
	}
    var datetimeValue = formatdateTimeStr(currentdate.getFullYear()) + "-"
    				+formatdateTimeStr(currentdate.getMonth()+1)  +"-"
				    +formatdateTimeStr(currentdate.getDate()) 
	                +"T" 
	                + formatdateTimeStr(currentdate.getHours()) + ":"  
	                + formatdateTimeStr(currentdate.getMinutes()) + ":" 
	                + formatdateTimeStr(currentdate.getSeconds());
	return datetimeValue;
}

function formatdateTimeStr(i) {
    return (i < 10) ? "0" + i : "" + i;
}

function calculateDateTimeDiff(old_date,new_date) {
	// The number of milliseconds in one second
     var ONE_SECOND = 1000;
     // Convert both dates to milliseconds
     var old_date_obj = new Date(old_date).getTime();
     var new_date_obj = new Date(new_date).getTime();
     // Calculate the difference in milliseconds
     var difference_ms = Math.abs(new_date_obj - old_date_obj)
     // Convert back to totalSeconds
     var totalSeconds = Math.round(difference_ms / ONE_SECOND);
     //alert('total seconds--' +totalSeconds);
     return totalSeconds;
}


// Variables Declarations
var catArrSession=[];
var subCatArrSession=[];
var productDetailsArrSession = [];
var attrDetailsArrSession = [];

/* ************* Database Code Starts   -------------------------  */
// Open Database
function openDatabase() {
   db.transaction(initializeDB, errorCB, successCB);
}
//Close Database
function closeDatabase() {
}
// InitializeDB the database 
function initializeDB(tx) {
	//tx.executeSql('CREATE TABLE IF NOT EXISTS tailor_details (id integer primary key autoincrement, api_id integer, first_name text, middle_name text, last_name text, business_title text, address1 text, address2 text, email text, contact1 text, contact2 text, secret_key text, city text, status integer, pincode integer, state_id integer, country_id integer, state_name text, country_name text, state_short_name text, country_short_name text, update_timestamp timestamp, description text)');
	
	//tx.executeSql('CREATE TABLE IF NOT EXISTS category(id integer primary key autoincrement, server_cat_id integer, parent_id integer,name text,update_timestamp text, description text, catImage text, catStatus integer, children text)');
	
	//tx.executeSql('CREATE TABLE IF NOT EXISTS product_details (id integer primary key autoincrement, server_prod_id integer, name text, description text, update_timestamp text, measurement_typeid integer, status integer, attribute_details text, gallery text, category text)');
	//tx.executeSql('CREATE TABLE IF NOT EXISTS product_attributes (id integer primary key autoincrement, server_attr_id integer, name text, identifier text, status integer, backend_name text, update_timestamp text, option text)');
//	tx.executeSql('CREATE TABLE IF NOT EXISTS measurement_details (id integer primary key autoincrement, name text, server_measurement_id integer, status integer, update_timestamp timestamp, group text, measurement_type_id integer)');
	
	//tx.executeSql('CREATE TABLE IF NOT EXISTS customer_details (id integer primary key autoincrement, api_id integer, parent_id integer,name text, update_timestamp timestamp)');
	//tx.executeSql('CREATE TABLE IF NOT EXISTS order_details (id integer primary key autoincrement, api_id integer, parent_id integer,name text, update_timestamp timestamp)');
	
}
// Common Transaction success callback
function successCB() {
	//alert('db transcation success');
}
//Transaction error callback
function errorCB(err) {
	//alert("Error processing SQL: "+err.code);
	//console.log("Error processing SQL: "+err.code);
}

// INSERT FUNCTIONS LIST
// Tailor Details
// Menu Categories
// Product List
// Product Attributes
// Product Measurements Fields

// UPDATE FUNCTIONS LIST
// Tailor Details
// Menu Categories
// Product List
// Product Attributes
// Product Measurements Fields

// Customer Details
// Orders Details

function insertCategories(arrData) {
	
	//db.transaction(insertCategories, errorCBInsertCategories, successCBInsertCategories);
	
	db.transaction(function(tx) {
		
		tx.executeSql('CREATE TABLE IF NOT EXISTS category(id integer primary key autoincrement, server_cat_id integer, parent_id integer,name text,update_timestamp text, description text, catImage text, catStatus integer, children text)');
		
		jQuery.each(arrData, function(index,value) {
			var server_cat_id = value['id'];
			var name = value.name;
			var parent_id = value.parent_id;
			var description = value.description;
			var catImage = value["image"];
			var catStatus = value["status"];
			var update_timestamp='';
			var childrenArrString = '';
			var childrenArr = value.children;    
			var childExist = '0';
			if(childrenArr != ''){
				childExist = '1';
			}
			tx.executeSql('INSERT INTO category(server_cat_id, parent_id, name, update_timestamp, description, catImage, catStatus, children) VALUES (?,?,?,?,?,?,?,?)',
						[server_cat_id, parent_id, name, update_timestamp,description, catImage, catStatus, childExist], function(tx, res) {
				alert(server_cat_id, name, childExist);
			});
			
			if(childExist == '1'){
				jQuery.each(childrenArr, function(index1,value1) { 
					var server_cat_id_child = value1['id'];
					var name_child = value1.name;
					var parent_id_child = value1.parent_id;
					var description_child = value1.description;
					var catImage_child = value1["image"];
					var catStatus_child = value1["status"];
			
					tx.executeSql('INSERT INTO category(server_cat_id, parent_id, name, update_timestamp, description, catImage, catStatus, children) VALUES (?,?,?,?,?,?,?,?)',
							[server_cat_id_child, parent_id_child, name_child, update_timestamp,description_child, catImage_child, catStatus_child, childrenArrString], function(tx, res) {
						alert(server_cat_id_child, parent_id_child, name_child);
					});	
				});
			}
		});
	},errorCBInsertCategories, successCBInsertCategories);
}

function successCBInsertCategories() {
	console.log("successCBInsertCategories");
	//getCategoriesListFromLocal();
	//checkProductInLocalDB();
	getProductDataFromServer();
}	

function errorCBInsertCategories(err) {
	console.log("errorCBInsertCategories");
	document.write("errorCBInsertCategories" + err);
}

function getCategoriesListFromLocal(){
	db.transaction(	function (tx){
			tx.executeSql('select * from category',[],function(tx,results){
					var len = results.rows.length;
					if(len>0){
						for (var i = 0; i < len; i++) {
							var jsonObj={};
							jsonObj.id=results.rows.item(i)['id'];
							jsonObj.server_cat_id=results.rows.item(i)['server_cat_id'];
							jsonObj.parent_id=results.rows.item(i)['parent_id'];
							jsonObj.name=results.rows.item(i)['name'];
							jsonObj.description=results.rows.item(i)['description'];
							jsonObj.children=results.rows.item(i)['children'];
							
							if(jsonObj.parent_id !=''){
								subCatArrSession.push(jsonObj);
							}else{
								catArrSession.push(jsonObj);
							}
							
							
						}
					}
				}, errorCB
			);
		},errorCBCatListDB,successCBCatListDB
	);
}

function successCBCatListDB() {
	appendCatListDB(catArrSession, subCatArrSession);
}	

function errorCBCatListDB() {
	console.log("errorCBCatListDB");
}

function successCBCatLocalDB() {
	console.log("successCBCatLocalDB");
}	

function errorCBCatLocalDB() {
	console.log("errorCBCatLocalDB");
}

function successCBSubCatListDB() {
	
	appendSubCatListDB(subCatArrSession);
}	

function errorCBSubCatListDB() {
	console.log("errorCBCatListDB");
}

function insertProductDetails(tx) {
	
	tx.executeSql('CREATE TABLE IF NOT EXISTS product_details (id integer primary key autoincrement, server_prod_id integer, name text, description text, update_timestamp text, measurement_typeid integer, status integer, attribute_details text, gallery text, category text)');
	
	jQuery.each(productJsonData, function(index,value) {
		var server_prod_id = value['id'];
		var name = value['name'];
		var description = value['description'];
		var attribute_details = value['attributes'];
		//var attributeObj = {};
		//attributeObj['attributeArr'] = attribute_details;
		var attributeJson = JSON.stringify(attribute_details);
		var prod_status = value['status'];
		var measurement_typeid = value['measurement_typeid'];
		var update_timestamp = '';
		
		var category = value['category'];
		//var categoryObj = {};
		//categoryObj['categoryArr'] = category;
		var categoryJson = JSON.stringify(category);
		
		var gallery = value['gallary'];
		//var galleryObj = {};
		//galleryObj['galleryArr'] = gallery;
		var galleryJson = JSON.stringify(gallery);
		//alert(server_prod_id +' name ' +name+ ' description ' +description + 'prod_status  '+prod_status);
		//alert(attributeJson +' measurement_typeid ' +measurement_typeid+ ' categoryJson ' +categoryJson + 'galleryJson  '+galleryJson);
		
		//id integer primary key autoincrement, server_prod_id integer, name text, description text, update_timestamp text, measurement_typeid integer, status integer, attribute_details text, gallery text, category text
		
		tx.executeSql('INSERT INTO product_details (server_prod_id, name, description, update_timestamp, measurement_typeid, status, attribute_details, gallery, category) VALUES (?,?,?,?,?,?,?,?,?)',
   	    			[server_prod_id, name, description, update_timestamp, measurement_typeid, prod_status, attributeJson, galleryJson, categoryJson], function(tx, res) {
	   	         alert("PD insertId: " + res.insertId );
  	    });
	});
}

function successCBProdListDB() {
	appendProdListDB(productDetailsArrSession);
}	

function errorCBProdListDB() {
	console.log("errorCBProdListDB");
}

function successCBProdLocalDB() {
	console.log("successCBProdLocalDB");
}	

function errorCBProdLocalDB() {
	console.log("errorCBProdLocalDB");
}

function successCBInsertProductDetails() {
	console.log("successCBInsertProductDetails");
	 console.log('Populated database OK');
	// checkAttributeInLocalDB();
	 getAttributesDataFromServer();
}

function errorCBInsertProductDetails(err) {
	console.log("errorCBInsertProductDetails");
}

function getProductsListFromLocal(){
	db.transaction(	function (tx){
			tx.executeSql('select * from product_details ',[],function(tx,results){
					var len = results.rows.length;
					if(len>0){
						for (var i = 0; i < len; i++) {
							var jsonObj={};
							//server_prod_id, name, description, update_timestamp, measurement_typeid, status, attribute_details, gallery, server_cat_prod_id, server_cat_id, image_url
							jsonObj.id = results.rows.item(i)['id'];
							jsonObj.server_prod_id = results.rows.item(i)['server_prod_id'];
							jsonObj.prod_name = results.rows.item(i)['name'];
							jsonObj.prod_description = results.rows.item(i)['description'];
							jsonObj.measurement_typeid = results.rows.item(i)['measurement_typeid'];
							jsonObj.prod_status = results.rows.item(i)['status'];
							jsonObj.attribute_details = results.rows.item(i)['attribute_details'];
							jsonObj.gallery = results.rows.item(i)['gallery'];
							jsonObj.category = results.rows.item(i)['category'];
							productDetailsArrSession.push(jsonObj);
							
						}
					}
				}, errorCB
			);
		},errorCBProdListDB,successCBProdListDB
	);
}

function insertAttributesDetails(tx) {
	
	tx.executeSql('CREATE TABLE IF NOT EXISTS product_attributes (id integer primary key autoincrement, server_attr_id integer, name text, identifier text, status integer, backend_name text, update_timestamp text, option text)');
	
	jQuery.each(attributeJsonData, function(index,value) {
		//id, server_attr_id, name, identifier, status, backend_name, update_timestamp, option
		var server_attr_id = value['id'];
		var name = value['name'];
		var identifier = value['identifier'];
		var attr_status = value['status'];
		var backend_name = value['backend_name'];
		var option = value['option'];
		//var image_url = value['image_url'];
		var optionObj = {};
		optionObj['optionArr'] = option;
		var optionJson = JSON.stringify(optionObj);
		var update_timestamp = '';
		// id integer primary key autoincrement, server_attr_id integer, name text, identifier text, status integer, backend_name text, update_timestamp text, option text
		//alert('optionJson '+optionJson+' value'+value);
		tx.executeSql('INSERT INTO product_attributes(server_attr_id, name, identifier, status, backend_name, update_timestamp, option) VALUES (?,?,?,?,?,?,?)',
   	    			[server_attr_id, name,identifier, attr_status, backend_name, update_timestamp, optionJson], function(tx, res) {
	   	         //alert("Attribute Data insertId: " + res.insertId + " -- res.rowsAffected 1"+res.rowsAffected);
  	    });
	});
}

function successCBAttrListDB() {
	//alert('Product Attribute successfully inserted.');
	//appendAttrListDB(attrDetailsArrSession);
}	

function errorCBAttrListDB() {
	//alert("errorCBProdListDB");
}

function successCBInsertAttributeDetails() {
	//alert("successCBInsertAttributeDetails");
	
	 console.log('Populated database OK');
	 //checkMeasurementInLocalDB();
	 getMeasurementsDataFromServer();
	    
}	
function errorCBInsertAttributeDetails(err) {
	//alert("errorCBInsertAttributeDetails");
}

function successCBAttrLocalDB() {
	console.log("successCBAttrLocalDB");
}	

function errorCBAttrLocalDB() {
	console.log("errorCBAttrLocalDB");
}

function getAttributeListFromLocal(){
	db.transaction(	function (tx){
		var len = 0;
			tx.executeSql('select * from product_attributes ',[],function(tx,results){
					len = results.rows.length;
					//alert('length '+len);
					if(len>0){
						for (var i = 0; i < len; i++) {
							var jsonObj={};
							//id, server_attr_id, name, identifier, status, backend_name, update_timestamp, option
							jsonObj.id = results.rows.item(i)['id'];
							jsonObj.server_attr_id = results.rows.item(i)['server_attr_id'];
							jsonObj.attr_name = results.rows.item(i)['name'];
							jsonObj.identifier = results.rows.item(i)['identifier'];
							jsonObj.attr_status = results.rows.item(i)['status'];
							jsonObj.backend_name = results.rows.item(i)['backend_name'];
							jsonObj.option = results.rows.item(i)['option'];
							//jsonObj.image_url = results.rows.item(i)['image_url'];
							
							attrDetailsArrSession.push(jsonObj);
							//alert('Local : '+attrDetailsArrSession);
							
						}
					}
				}, errorCB
			);
		},errorCBAttrListDB,successCBAttrListDB
	);
}
function insertMeasurementsDetails(tx) {
	
	tx.executeSql('CREATE TABLE IF NOT EXISTS measurement_details (id integer primary key autoincrement, name text, server_measurement_id integer, status integer, update_timestamp timestamp, group text)');
	
	jQuery.each(measurementJsonData, function(index,value) {
		// name, server_measurement_id, status, update_timestamp, group, measurement_type_id
		
		var server_measurement_id = value["id"];
		var name = value["name"];
		var group = value["group"];
		var meas_status = value["status"];
		var updateTimestamp = '';
		//var measurementTypeId = value['measurement_type_id'];
		var groupObj = {};
		groupObj['groupArr'] = group;
		var groupJson = JSON.stringify(groupObj);
		var update_timestamp = '';
		tx.executeSql('INSERT INTO measurement_details(name, server_measurement_id, status, update_timestamp, group) VALUES (?,?,?,?,?,?)',
   	    			[name, server_measurement_id,meas_status, update_timestamp, groupJson], function(tx, res) {
	   	         alert("Attribute Data insertId: " + res.insertId + " -- res.rowsAffected 1"+res.rowsAffected);
  	    });
	});
}




/* ************* Database Code Ends   -------------------------  */

/*  ------------------- Common Methods/Function Code Starts -------------------------  */
	function getDataByAction(actionName, mDataJsonString, successCallbackFn, errorCallbackFn) {
		connectionType=checkConnection();
		
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			showModal();
			var loginData={};
			loginData.username=window.localStorage["username"];
			loginData.password=window.localStorage["password"];
			//loginData.gcmregdid = window.localStorage["gcmregistrationId"];
			loginData.gcmregdid = "reg";//For Testing
			
			$.ajax({
				//type : 'POST',
				url:appUrl,
				data : {"action":actionName, "loginData":JSON.stringify(loginData), "mData":mDataJsonString },
				success: successCallbackFn,
			    error: errorCallbackFn
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}
	
	function getDataByUrlAndData(url, data, successCallbackFn, errorCallbackFn, ajaxCallType) {
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			//showModal();
			/*
			var loginData={};
			loginData.username=window.localStorage["username"];
			loginData.password=window.localStorage["password"];
			loginData.gcmregdid = window.localStorage["gcmregistrationId"];
			loginData.gcmregdid = "reg";//For Testing
			*/
			
			$.ajax({
				type : ajaxCallType,
				url: url,
				data : data,
				success: successCallbackFn,
			    error: errorCallbackFn
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}
	
	function commonSuccessCallback(data) {
		hideModal();
		var res=jQuery.parseJSON(data);
		responseData=JSON.stringify(res);
		console.log(responseData);
	}
	
	function commonErrorCallback(data) {
	    hideModal();
		navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		var responseJson = $.parseJSON(data);
		if(responseJson.status==404){
		     navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}
	
	function commonPageSuccessCallback(data){
		homePageData(data);
		var responseJson=jQuery.parseJSON(data);
		if(responseJson.statusCode == "0" ){
			var $parentEleObj = $('.common-page-tab1 .mb-st-assignment-list ul.st-assigment');
			$parentEleObj.html("");
			$('.common-page-tab1 .mb-st-assignment-list').show();
			var actionHeading=responseJson["actionHeading"];
			$('.common-page-tab1 .common-page-tab-heading').html(actionHeading);
			
			var action=responseJson["action"];
			var jsonData=responseJson["data"];
			
			if(action=="getHolidays"){
				commonPageAssignmentData($parentEleObj, jsonData);
			}
			else if(action=="getAttendanceForStaff"){
				commonPageAttendanceForStaffData($parentEleObj, jsonData);
			}
			$.mobile.changePage('#common-page','slide');
		}else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');					
		}
		hideModal();
	}
	
	function commonPageLiNoDataMsg($parentEleObj, msg){
		var statusClass = "status-common";
		var dataEleObj = '<li>'+
							'<i class="fa fa-dot-circle-o status-circle '+statusClass+' "></i>'+
							'<div class="st-assign-detail">'+
								'<span class="assign-arrow"></span>'+
									'<p class="assign-title"> ' + msg +
									'</p>'+
							'</div>'+
						'</li>';
		$parentEleObj.append(dataEleObj);
	}
	
	function dateTimestamp() {
	    var d = new Date();
	    
	    var yyyy = addZero(d.getFullYear(), 4);
	    var month = addZero(d.getMonth()+1, 2);
	    var dd = addZero(d.getDate(), 2);
	    
	    
	    var hh = addZero(d.getHours(), 2);
	    var mm = addZero(d.getMinutes(), 2);
	    var ss = addZero(d.getSeconds(), 2);
	    var mss = addZero(d.getMilliseconds(), 3);
	    
	    var dateTimeStampTemp = yyyy + month + dd +"_"+ hh + mm + ss + mss;
	    return dateTimeStampTemp;
	}
/*  ------------------- Common Methods/Function Code Ends -------------------------  */


/*  ------------------- Module-wise Methods/Function Code Starts ------------------  */	

	function getCountByTableName(tablename){
	    var x;
	    db.readTransaction(function (t) {
	        t.executeSql('SELECT COUNT(*) AS c FROM ' + tablename, [], function (t, r) {
	            alert(r.rows[0].c + "rows")
	            x= r.rows[0].c;
	        });
	    });
	    return x;
	}
	
	function checkCategoryInLocalDB(){
		len = 0;
		len = getCountByTableName("category");
		if(len > 0){
			window.localStorage["dbreadyflag"] = 1;
			// checkProductInLocalDB();
		}else{
			alert('category Details  count 0');
			getCategoriesDataFromServer();
		}
	}
	
	function checkProductInLocalDB(){
		var len = getCountByTableName("product_details");
		if(len > 0){
			alert('Product Details ');
			//checkAttributeInLocalDB();
		}else{
			alert('Product Details count 0');
			//getProductDataFromServer();
		}
	}
	
	function checkAttributeInLocalDB(){
		var len = getCountByTableName("product_attributes");
		if(len > 0){
			alert('Attribute Details');
			//checkMeasurementInLocalDB();
		}else{
			alert('Attribute Details count 0');
			//getAttributesDataFromServer();
		}
	}
	
	function checkMeasurementInLocalDB(){
		var len = getCountByTableName("measurement_details");
		if(len > 0){
			alert('Measurement Details');
			//getCategoriesListFromLocal();
		}else{
			alert('Measurement Details  count 0');
			//getMeasurementsDataFromServer();
		}
	}
	
	function loadDataFromServer(){
		checkCategoryInLocalDB();
	}
	
	var tailorDetailsData;
	var categoriesJsonData;
	var attributeJsonData;
	var productJsonData;
	var measurementJsonData;
	var measurementTypeId = 0;

	function getCategoriesDataFromServer(){
		var dataToSend = {};
		dataToSend["secret_key"] = "4TPD6PI91";
		var apiCallUrl="http://tailorraniapp.stavyah.com/api/categories/categoriesJson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallPost,
				url: apiCallUrl,
				data : dataToSend,
				success: successCBServerCatFn,
				error: commonErrorCallback
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}

	function successCBServerCatFn(data){
		var responseJson = $.parseJSON(JSON.stringify(data));
		categoriesJsonData = responseJson["result"];
		//appendCatListDB(categoriesJsonData);
		// FIXME CHECK JSON DATA
		insertCategories(categoriesJsonData);
		
	}
	
	function appendCatListDB(catArrData, subCatArrData) {
		var categoryDiv = '<div class="row main-menu" >';
		var subCategoryDiv = "";
		
		jQuery.each(catArrData, function(index,value) {
			//alert('catArrData '+value);
			var jsonObj=value;
			var primaryCKeyId=jsonObj["id"];
			var server_cat_id=jsonObj["server_cat_id"];
			//var parent_id=jsonObj["parent_id"];
			var name=jsonObj["name"];
			var children=jsonObj["children"];
			var uniqueId = name+'_'+server_cat_id;
			//alert(primaryCKeyId + ' '+server_cat_id+' '+ name+' '+children +' '+ uniqueId);
			categoryDiv+='<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" data-submenuid="'+uniqueId
					+'" data-cat_id="'+server_cat_id+'" data-lid="'+primaryCKeyId
					+'" onclick="menuCategoryOne(this);"> <a href="#">'+name+'</a> </div>';
			//var childJsonObject = $.parseJSON(children);
			//subCategoryDiv += getSubCatListByLocalDB(parent_id, name, api_id, subCatArrData);
			//alert('categoryDiv: ' +categoryDiv);
			if(children != 0){
				var subCategoryTempDiv="";
				var isExist = false;
				jQuery.each(subCatArrData, function(indexObj,valueObj) {
					var childJsonObj = valueObj;
					var child_parent_id = childJsonObj["parent_id"];
					var primarySCKeyId = childJsonObj["id"];
					var server_cat_child_id = childJsonObj["server_cat_id"];
					//var child_description = childJsonObj["description"];
					var child_name = childJsonObj['name'];
					//alert('server_cat_id '+ server_cat_id+ ' child_parent_id' + child_parent_id);
					if(parseInt(server_cat_id) == parseInt(child_parent_id)){
						isExist = true;
						//subCategoryTempDiv += '<div class="row sub-menu '+name+'_'+api_id+'" id="'+name+'_'+api_id+'" style="display:none;">';
						
						subCategoryTempDiv += '<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" data-lid="'+primarySCKeyId+
							'" data-parcat_id="'+child_parent_id+'" data-cat_id="'+server_cat_child_id+'" onclick="mainGalleryFun(this);"><a href="#">'+ child_name +'</a></div>';
						//alert('subCategoryTempDiv: '+subCategoryTempDiv);
					}
				});
				
				if(isExist){
					//alert(uniqueId);
					var subCategoryDivFirst = '<div class="row sub-menu '+uniqueId+'" id="'+uniqueId+'">';
					subCategoryTempDiv = subCategoryDivFirst + subCategoryTempDiv + '</div>';
				}
				subCategoryDiv += subCategoryTempDiv;
				//alert(subCategoryDiv);
			}
		});
		
		categoryDiv+='</div>';
		$('#main-menu').remove();
		$('#sub-menu').remove();
		$( categoryDiv ).insertBefore( "#mainPageId .hrBarCatClass" );
		$( subCategoryDiv ).insertBefore( "#mainPageId .hrBarCatClass" );
		$('#mainPageId').find('.sub-menu').hide();
		//alert('Data Appended Successfully.');
		
		getProductsListFromLocal();
		getAttributeListFromLocal();
		//$('#mainPageId').append(categoryDiv);
		//$('#mainPageId').append(subCategoryDiv);
		//$('#mainPageId .childCatList').hide();
	}
	
	// Remaining
	function getProductDataFromServer(){
		var dataToSend = {};
		dataToSend["secret_key"] = "4TPD6PI91";
		var apiCallUrl="http://tailorraniapp.stavyah.com/api/products/productsJson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallPost,
				url: apiCallUrl,
				data : dataToSend,
				success: successCBServerProductFn,
				error: commonErrorCallback
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}

	function successCBServerProductFn(data){
		var responseJson = $.parseJSON(JSON.stringify(data));
		productJsonData = responseJson["result"];
		alert('productJsonData '+productJsonData);
		//alert(productJsonData);
		// FIXME CHECK JSON DATA
		db.transaction(insertProductDetails, errorCBInsertProductDetails, successCBInsertProductDetails);
	}
	
	function appendProdListDB(prodArrData) {
		var mainPageGallery = '';
		var attrMeasPageGallery = '';
		
		jQuery.each(prodArrData, function(index,value) {
			var jsonObj=value;
			var local_db_id=jsonObj["id"];
			var server_prod_id=jsonObj["server_prod_id"];
			var prod_name=jsonObj["prod_name"];
			var prod_description=jsonObj["prod_description"];
			var prodcat_id = jsonObj["prodcat_id"];
			var server_cat_id=jsonObj["server_cat_id"];
			var gallery=jsonObj["gallery"];
			var category=jsonObj["category"];
			//alert('appendProdListDB');
			//alert('server_prod_id '+server_prod_id+' prod_name '+server_cat_id);
			//alert(gallery);
			var galleryObj = jQuery.parseJSON(gallery);
			var categoryObj = jQuery.parseJSON(category);
			jQuery.each(galleryObj, function(indexObj,valueObj) {
				var gallery_id = valueObj['id'];
				var image = valueObj["image"];
				image = 'img/custom/img1.jpg';
				jQuery.each(categoryObj, function(indexcat,valueCat) {
					var server_cat_id = valueCat['cat_id'];
					var imageTag = '<img class="imageAppendAttrMeaCust" src="'+image+'"  alt="Saree" style="width:304px;height:500px;"/>';
					var galleryImage = '<div class="col-xs-6 col-sm-4 col-md-4 col-lg-4 galleriesClass gallcatid'+server_cat_id+'" data-gall_id="'+gallery_id+'" data-cat_id="'+server_cat_id+'" '+
							'data-prod_id="'+server_prod_id+'" data-lid="'+local_db_id+'" onclick="appendAttributeData(this)">'+
							'<img src="'+image+'"  alt="Saree" style="width:304px;height:500px;"/>'+prod_name+'</div>';
							alert('galleryImage -- '+galleryImage);
					mainPageGallery += galleryImage;
					attrMeasPageGallery += image;
				});
				//alert(' appendProdListDB  gallcatid'+server_cat_id+'');
			});
		});
		//alert('mainPageGallery ' +mainPageGallery);
		$("#mainPageId").find('.galleriesClass').remove();
		$("#mainPageId").find('.product-list').append(mainPageGallery);
		$('#mainPageId .product-list').find('.galleriesClass').hide();
		$('.imageAppendAttrMeaCust').remove();
		//$('.imageAppendSelMea').remove();
		$('.attributePageLocation').append(attrMeasPageGallery);
		$('.measurementPageLocation').append(attrMeasPageGallery);
	}
	
	function appendAttributeData(currentData){
		
		var productDataForAttr = productDetailsArrSession; 
		var selectMeasBarPageDiv = '';
		var attrMeasPageGallery = '';
		var attrIds = []; var prodAttrIds = [];
		jQuery.each(productDataForAttr, function(index,value) {
			var jsonObj = value;
			var local_db_id = jsonObj["id"];
			var server_prod_id = jsonObj["server_prod_id"];
			var prod_name = jsonObj["prod_name"];
			var prod_description = jsonObj["prod_description"];
			var attribute_details = jsonObj["attribute_details"];
			var attributeObj = jQuery.parseJSON(attribute_details);
			var category = jsonObj["category"];
			var categoryObj = jQuery.parseJSON(category);
			var mainPageCatId = $(currentData).data('cat_id');
			var mainPageProdId = $(currentData).data('prod_id');
			jQuery.each(categoryObj, function(indexCat,valueCat) {
				var server_cat_id = valueCat['cat_id'];
				if(mainPageProdId == server_prod_id && mainPageCatId == server_cat_id){
					measurementTypeId = value['measurement_typeid'];
					jQuery.each(attributeObj, function(indexObj,valueObj) {
						//alert('goToAttributePage AttributeArr');
						var paIds = valueObj['id'];
						var attrId = valueObj['attr_id'];
						prodAttrIds[indexObj] = paIds;
						attrIds[indexObj] = attrId;
					});
					getAttrDataToAppend(prodAttrIds, attrIds, server_cat_id, server_prod_id);
				}
			});
		});
		/*$("#mainPageId").find('.product-list').append(mainPageGallery);
		$('.attributePageLocation').remove();
		$('.measurementPageLocation').remove();
		$('.attributePageLocation').append(attrMeasPageGallery);
		$('.measurementPageLocation').append(attrMeasPageGallery);*/
		
	}
	
	
	
	function getAttributesDataFromServer(){
		var dataToSend = {};
		dataToSend["secret_key"] = "4TPD6PI91";
		var apiCallUrl="http://tailorraniapp.stavyah.com/api/attributes/attributesJson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallPost,
				url: apiCallUrl,
				data : dataToSend,
				success: successCallbackAttributesFn,
				error: commonErrorCallback
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}

	function successCallbackAttributesFn(data){
		var responseJson = $.parseJSON(JSON.stringify(data));
		attributeJsonData = responseJson["result"];
		//alert(attributeJsonData);
		// FIXME CHECK JSON DATA
		db.transaction(insertAttributesDetails, errorCBInsertAttributeDetails, successCBInsertAttributeDetails);
	}
	
	function getAttrDataToAppend(prodAttrArray, attrArray, cat_Id, prod_Id){
		appendAttrDataByArraysAndIds(prodAttrArray, attrArray, cat_Id, prod_Id);
	}
	
	function appendAttrDataByArraysAndIds(prodAttrArr, attrArr, catId, prodId){
		var attributeDiv = '';
		var optionMainDiv = '';
		//alert('appendAttrDataByArraysAndIds --- ');
		//alert('attrDetailsArrSession --- '+attrDetailsArrSession);
		
		var attrNameIndex0 = '';
		jQuery.each(attrDetailsArrSession, function(index,value) {
			var attrId = value['id'];
			var server_attr_id = value['server_attr_id'];
			var attr_name = value['attr_name'];
			var identifier = value['identifier'];
			var backend_name = value['backend_name'];
			var option = value['option'];
			var optionObj = jQuery.parseJSON(option);
			if(index == 0){
				attrNameIndex0 = attr_name;
			}
			jQuery.each(attrArr, function(index1,value1) {
				if(value1 == attrId){
					var tempAttrDiv = '';
						tempAttrDiv = '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 selMenu-bar indexAttr'+index1+'" data-attrIndex="indexAttr'+attr_name+'" onclick="attrMenu(this)" data-cat_id="'+catId+'" data-prod_id="'+prodId+'" data-attrid="'+server_attr_id+'" data-lid="'+attrId+'"><a href="#">'+attr_name+'</a></div>';
					jQuery.each(optionObj['optionArr'], function(index2,value2) {
						var optionName = value2['name'];
						var optionImg = value2['image'];
						var optionId = value2['id'];
						optionImg = 'img/custom/img1.jpg';
						var tempOptDiv = '<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 optMenu-bar optionAttr'+index1+'" onclick="selectOption(this);" data-cat_id="'+catId+'" data-prod_id="'+prodId+'" data-attrid="'+server_attr_id+'" data-lid="'+attrId+'"><div class="box"><img src="'+optionImg+'" alt="Saree" style="width:200px;height:200px;">'+optionName + ' ' +attr_name +'</div></div>';
						optionMainDiv += tempOptDiv;
					});
					 attributeDiv += tempAttrDiv;
				}
			});
			attributeDiv = '<div class="row indexAttr'+attr_name+'">' + attributeDiv + '</div>'
		});
		$('.selMenu-bar').remove();
		$('.selection-menu').append(attributeDiv);
		
		$('.attr-option-div').append(optionMainDiv);
		$('.optMenu-bar').hide();
		$('.optionAttr'+attrNameIndex0).show();
		gotoAttributePageDiv();
	}

	var measurementsData;
	function getMeasurementsDataFromServer(){
		var dataToSend = {};
		dataToSend["secret_key"] = "4TPD6PI91";
		var apiCallUrl="http://tailorraniapp.stavyah.com/api/measurements/measurementsJson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallPost,
				url: apiCallUrl,
				data : dataToSend,
				success: successCBMeasurementsFn,
				error: commonErrorCallback
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}

	function successCBMeasurementsFn(data){
		var responseJson = data;
		//db.transaction(insertMeasurementsDetails, errorCB, successCB);
		measurementJsonData = responseJson["result"];
		alert('measurementJsonData');
		//alert(attributeJsonData);
		// FIXME CHECK JSON DATA
		db.transaction(insertMeasurementsDetails, errorCBInsertMeasurementDetails, successCBInsertMeasurementDetails);
		//, errorCBInsertAttributeDetails, successCBInsertAttributeDetails
	}
	
	function successCBInsertMeasurementDetails() {
		//alert("successCBInsertMeasurementDetails");
		
		 console.log('Populated database OK');
		 
		 getCategoriesListFromLocal();
		 //checkAttributeInLocalDB();
		    
	}	
	function errorCBInsertMeasurementDetails(err) {
		alert("errorCBInsertAttributeDetails");
	}
	
	function getMeasurementsJson(){
		mData={};	
		mData.secret_key="4TPD6PI91";
		getDataByAction("getHolidays", JSON.stringify(mData), commonPageSuccessCallback, commonErrorCallback);
	}
	
/*  ------------------- Module-wise Methods/Function Code Starts ------------------  */	

/*  ------------------- Other Methods/Function like Click, Load, etc. Starts ------------------  */		
	
	function menuCategoryOne(object){
		var subMenuId = $(object).data('submenuid');
		$('#mainPageId').find('.sub-menu').hide();
		$("."+subMenuId).show();
		mainGalleryFun(object);
	}
	
	function mainGalleryFun(object){
		var cat_id = $(object).data('cat_id');
		$('.galleriesClass').hide();
		$(".gallcatid"+cat_id).show();
	}
	
	function attrMenu(object){
		var attrFindObj = $(object).data('attrIndex');
		$('.optMenu-bar').hide();
		$('.'+attrFindObj).show();
	}
	
	function getAndShowMeasurementDetails(){
		
	}
	