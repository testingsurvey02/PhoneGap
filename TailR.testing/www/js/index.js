// For Testing in Browser
/*
$(function() {
	loadDataFromServer();
});

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
var testingInBrowser=false;// For Testing
var loginUserId;
var dataIsFromServer = 0;
var measurementTypeDiv = 0;
var customerTypeDiv = 0;
var tailorDetailsJsonData;
var categoriesJsonData;
var attributeJsonData;
var productJsonData;
var measurementJsonData;
var measurementTypeId = 0;

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
        // db = window.sqlitePlugin.openDatabase({name: "tailorrani.db", location: 2});
        // db = window.openDatabase("Database", "1.0", "tailorrani.db", 200000);
		db.transaction(initializeDB, errorCB, successCB);
        
		// FIXME PUT CONDITIONS
		// LOAD DATA FROM SERVER
		// UPDATE TO SERVER
		// UPDATE DATA FROM SERVER
		window.localStorage["dbreadyflag"] = 0;
		//loadDataFromServer();
    },
};

function fail() {
    console.log("failed to get filesystem");
}

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
	
	if(testingInBrowser){
		connectionType="WiFi connection";//For Testing
		return connectionType;
	}
	
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    //states[Connection.CELL_5G]  = 'Cell 5G connection';
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

function loginFn(){
	loginUserId = $('#username').val();
	console.log(loginUserId);
	if(loginUserId == 'undefined' || loginUserId == ''){
		alert('Sorry please login with User Id');
	}else if(loginUserId != 'undefined' && loginUserId != ''){
		loadDataFromServer();
	}
}

function gotoLoginPage(){
	$.mobile.changePage('#login-page','slide');
	return false;
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
	$('#prodHtmlName').val('');
	$('#prodHtmlId').val('');
	$('#categoryHtmlId').val('');
	$('#customerIdInput').val('');
	$('#newOrderId').val('');
	$('#customerNameInput').val('');
	$('#priceInput').val('');
	$('#contactNumberInput').val('');
	$('#addressInput').val('');
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
var measurementArrSession = [];
var measurementTypeId = '';
var orderArrSession = [];
var customerArrSession = [];
var tailorDetailsSession = {};

//The directory to store data
var store;
var storeExternal;

//Used for status updates
var $status;

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
	//	tx.executeSql('CREATE TABLE IF NOT EXISTS category(id integer primary key autoincrement, server_cat_id integer, parent_id integer,name text,update_timestamp text, description text, catImage text, catStatus integer, children text)');
	//	tx.executeSql('CREATE TABLE IF NOT EXISTS product_details (id integer primary key autoincrement, server_prod_id integer, name text, description text, update_timestamp text, measurement_typeid integer, status integer, attribute_details text, gallery text, category text)');
	//	tx.executeSql('CREATE TABLE IF NOT EXISTS product_attributes (id integer primary key autoincrement, server_attr_id integer, name text, identifier text, status integer, backend_name text, update_timestamp text, option text)');
	//	tx.executeSql('CREATE TABLE IF NOT EXISTS measurement_details (id integer primary key autoincrement, name text, server_measurement_id integer, status integer, update_timestamp text, group text, measurement_type_id integer)');
	
	//	tx.executeSql(CREATE TABLE IF NOT EXISTS customer_details (id integer primary key autoincrement,name text, total_price text, advance_price text, balance_price text, update_timestamp text, contact_number text, email_id text, country text, state text, city text, pincode text, address_one text, address_two text)');
	//	tx.executeSql('CREATE TABLE IF NOT EXISTS order_details(id integer primary key autoincrement, server_cat_id integer, server_prod_id integer, order_data text,update_timestamp text, server_prod_name text,customer_id integer, option_selected text, status_of_order text, gallery_id integer, gallery_name text)');
}

// Common Transaction success callback
function successCB() {
	//alert('db transcation success');
	//console.log('db transcation success');
	loadDataFromServer();
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


function insertTailorDetailsDetails(tx) {
	var currDateTimestamp="";
	currDateTimestamp=dateTimestamp();
	//tx.executeSql('CREATE TABLE IF NOT EXISTS tailor_details (id integer primary key autoincrement, server_td_id integer, first_name text, middle_name text, last_name text, business_title text, address1 text, address2 text, email text, contact1 text, contact2 text, secret_key text, tailor_status integer, city text, pincode text, state_id integer, country_id integer, state_name text, country_name text, update_timestamp text)');
	console.log('insertTailorDetailsDetails tailorDetailsJsonData '+tailorDetailsJsonData);	
	var jsonTempData = tailorDetailsJsonData;
		var tailor_details_id = jsonTempData["id"];
		var first_name = jsonTempData["first_name"];
		var last_name = jsonTempData["last_name"];
		var middle_name = jsonTempData["middle_name"];
		var business_title = jsonTempData["business_title"];
		var address1 = jsonTempData["address1"];
		var address2 = jsonTempData["address2"];
		var tailemail = jsonTempData["email"];
		var contact1 = jsonTempData["contact1"];
		var contact2 = jsonTempData["contact2"];
		var secret_key = jsonTempData["secret_key"];
		var tailor_status = jsonTempData["status"];
		var city = jsonTempData["city"];
		var pincode = jsonTempData["pincode"];
		var state_id = jsonTempData["state_id"];
		var country_id = jsonTempData["country_id"];
		var state_name = jsonTempData["state_name"];
		var country_name = jsonTempData["country_name"];
		var update_timestamp = currDateTimestamp;
		//server_td_id, first_name, middle_name, last_name, business_title, address1, address2, email, contact1, contact2, secret_key, status, city, pincode, state_id, country_id, state_name, country_name, update_timestamp

		
		tx.executeSql('INSERT INTO tailor_details(server_td_id, first_name, middle_name, last_name, business_title, address1, address2, email, contact1, contact2, secret_key, tailor_status, city, pincode, state_id, country_id, state_name, country_name, update_timestamp) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
   	    			[tailor_details_id, first_name,last_name, middle_name, business_title, address1, address2, tailemail, contact1, contact2, secret_key, tailor_status, city, pincode, state_id, country_id, state_name, country_name, update_timestamp], function(tx, res) {
	   	         //alert("Tailor Details Data insertId: " + res.insertId + " -- res.rowsAffected 1"+res.rowsAffected);
  	    });
	
}

function getTailorDetailsFromLocal(){
	if(testingInBrowser){
		var tailorDetailsObj={};
		tailorDetailsObj.id = 1;
		tailorDetailsObj.tailor_details_id = 1;
		tailorDetailsObj.first_name = "First_name";
		tailorDetailsObj.last_name = "Last_Name";
		tailorDetailsObj.middle_name = "Middle_name";
		tailorDetailsObj.business_title = "Business Title";
		tailorDetailsObj.address1 = "address1";
		tailorDetailsObj.address2 = "address2";
		tailorDetailsObj.tailemail = "emailId@email.com";
		tailorDetailsObj.contact1 = "9999999999";
		tailorDetailsObj.contact2 = "9999999999";
		tailorDetailsObj.secret_key = "4TPD6PI91";
		tailorDetailsObj.tailor_status = 1;
		tailorDetailsObj.city = "Bangalore";
		tailorDetailsObj.pincode = "789456";
		tailorDetailsObj.state_id = "2";
		tailorDetailsObj.country_id = "1";
		tailorDetailsObj.state_name = "Maharastra";
		tailorDetailsObj.country_name = "India";
		tailorDetailsObj.update_timestamp = "1";
		tailorDetailsSession = tailorDetailsObj;
		
		getCategoriesListFromLocal();
		return;
	}
	
	db.transaction(	function (tx){
		//tx.executeSql('CREATE TABLE IF NOT EXISTS tailor_details (id integer primary key autoincrement, server_td_id integer, first_name text, middle_name text, last_name text, business_title text, address1 text, address2 text, email text, contact1 text, contact2 text, secret_key text, tailor_status integer, city text, pincode text, state_id integer, country_id integer, state_name text, country_name text, update_timestamp text)');
		var len = 0;
			tx.executeSql('select * from tailor_details ',[],function(tx,results){
					len = results.rows.length;
					if(len>0){
						tailorDetailsSession = {};
						for (var i = 0; i < len; i++) {
							var tailorDetailsObj={};
							tailorDetailsObj.id = results.rows.item(i)['id'];
							tailorDetailsObj.tailor_details_id = results.rows.item(i)['tailor_details_id'];
							tailorDetailsObj.first_name = results.rows.item(i)['first_name'];
							tailorDetailsObj.last_name = results.rows.item(i)['last_name'];
							tailorDetailsObj.middle_name = results.rows.item(i)['middle_name'];
							tailorDetailsObj.business_title = results.rows.item(i)['business_title'];
							tailorDetailsObj.address1 = results.rows.item(i)['address1'];
							tailorDetailsObj.address2 = results.rows.item(i)['address2'];
							tailorDetailsObj.tailemail = results.rows.item(i)['tailemail'];
							tailorDetailsObj.contact1 = results.rows.item(i)['contact1'];
							tailorDetailsObj.contact2 = results.rows.item(i)['contact2'];
							tailorDetailsObj.secret_key = results.rows.item(i)['secret_key'];
							tailorDetailsObj.tailor_status = results.rows.item(i)['tailor_status'];
							tailorDetailsObj.city = results.rows.item(i)['city'];
							tailorDetailsObj.pincode = results.rows.item(i)['pincode'];
							tailorDetailsObj.state_id = results.rows.item(i)['state_id'];
							tailorDetailsObj.country_id = results.rows.item(i)['country_id'];
							tailorDetailsObj.state_name = results.rows.item(i)['state_name'];
							tailorDetailsObj.country_name = results.rows.item(i)['country_name'];
							tailorDetailsObj.update_timestamp = results.rows.item(i)['update_timestamp'];
							tailorDetailsSession = tailorDetailsObj;
						}
					}
				}, errorCB
			);
		},errorCBTailorDetailsListDB,successCBTailorDetailsListDB
	);
}

function successCBTailorDetailsListDB() {
	//connectionType=checkConnection();
	//console.log('connection type : '+connectionType);
	/*if(connectionType=="Unknown connection" || connectionType=="No network connection"){
		console.log('No Connection');
		checkCategoryInLocalDB();
	}
	else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
		getCategoriesDataFromServer();
	}*/
	checkCategoryInLocalDB();
}	

function errorCBTailorDetailsListDB(err) {
	console.log("errorCBTailorDetailsListDB "+err.message);
}


function insertCategories(arrData) {
	//db.transaction(insertCategories, errorCBInsertCategories, successCBInsertCategories);
	db.transaction(function(tx) {
		var currDateTimestamp="";
		currDateTimestamp=dateTimestamp();
		tx.executeSql('CREATE TABLE IF NOT EXISTS category(id integer primary key autoincrement, server_cat_id integer, parent_id integer,name text,update_timestamp text, description text, catImage text, catStatus integer, children text)');
		
		jQuery.each(arrData, function(index,value) {
			var server_cat_id = value['id'];
			var name = value.name;
			var parent_id = value.parent_id;
			var description = value.description;
			var catImage = value["image"];
			var catStatus = value["status"];
			var update_timestamp=currDateTimestamp;
			var childrenArrString = '';
			var childrenArr = value.children;    
			var childExist = '0';
			if(childrenArr != ''){
				childExist = '1';
			}
			tx.executeSql('INSERT INTO category(server_cat_id, parent_id, name, update_timestamp, description, catImage, catStatus, children) VALUES (?,?,?,?,?,?,?,?)',
						[server_cat_id, parent_id, name, update_timestamp,description, catImage, catStatus, childExist], function(tx, res) {
				//alert(server_cat_id, name, childExist);
				console.log(' Parent Category ');
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
						//alert(server_cat_id_child, parent_id_child, name_child);
						console.log(' Child Category ');
					});	
				});
			}
		});
	},errorCBInsertCategories, successCBInsertCategories);
}

function successCBInsertCategories() {
	console.log(' category Successfully Inserted ');
	getProductDataFromServer();
}	

function errorCBInsertCategories(err) {
	console.log("errorCBInsertCategories : "+ err.message);
}

function getCategoriesListFromLocal(){
	if(testingInBrowser){
		var catArrSessionData='[{"id":1,"server_cat_id":1,"parent_id":"","name":"Men","description":"","image":"","sort_order":"1","status":"1"}, {"id":1,"server_cat_id":4,"parent_id":"","name":"Women","description":"","image":"","sort_order":"1","status":"1"}, {"id":1,"server_cat_id":7,"parent_id":"","name":"Kids","description":"","image":"","sort_order":"1","status":"1"}]';
		catArrSession=jQuery.parseJSON(catArrSessionData);
		
		var subCatArrSessionData='[{"id":2,"server_cat_id":2,"parent_id":"1","name":"SHIRT","description":"description02","image":"","sort_order":"1","status":"1"},{"id":3,"server_cat_id":3,"parent_id":"1","name":"PANT","description":"description03","image":"","sort_order":"2","status":"1"},{"id":2,"server_cat_id":5,"parent_id":"4","name":"KURTA","description":"description02","image":"","sort_order":"1","status":"1"},{"id":3,"server_cat_id":6,"parent_id":"4","name":"SKUT","description":"description03","image":"","sort_order":"2","status":"1"},{"id":2,"server_cat_id":8,"parent_id":"7","name":"T-Shirt","description":"description02","image":"","sort_order":"1","status":"1"},{"id":3,"server_cat_id":9,"parent_id":"7","name":"Chaddi","description":"description03","image":"","sort_order":"2","status":"1"}]';
		subCatArrSession=jQuery.parseJSON(subCatArrSessionData);
		
		
		appendCatListDB(catArrSession, subCatArrSession);
		return;
	}
	
	db.transaction(	function (tx){
		console.log('getCategoriesListFromLocal');
			tx.executeSql('select * from category',[],function(tx,results){
					var len = results.rows.length;
					if(len>0){
						catArrSession=[];
						subCatArrSession=[];
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

function errorCBCatListDB(err) {
	console.log("errorCBCatListDB : "+err.message);
}

function successCBCatLocalDB() {
	console.log("successCBCatLocalDB");
}	

function errorCBCatLocalDB(err) {
	console.log("errorCBCatLocalDB : "+err.message);
}

function successCBSubCatListDB() {
	appendSubCatListDB(subCatArrSession);
}	

function errorCBSubCatListDB(err) {
	console.log("errorCBSubCatListDB : "+err.message);
}

function insertProductDetails(tx) {
	var currDateTimestamp="";
	currDateTimestamp=dateTimestamp();
	tx.executeSql('CREATE TABLE IF NOT EXISTS product_details (id integer primary key autoincrement, server_prod_id integer, name text, description text, update_timestamp text, measurement_typeid integer, status integer, attribute_details text, gallery text, category text)');
	
	jQuery.each(productJsonData, function(index,value) {
		var server_prod_id = value['id'];
		var name = value['name'];
		var description = value['description'];
		var attributeJson = JSON.stringify(value['attributes']);
		var prod_status = value['status'];
		var measurement_typeid = value['measurement_typeid'];
		var update_timestamp = currDateTimestamp;
		var categoryJson = JSON.stringify(value['category']);
		var galleryJson = JSON.stringify(value['gallary']);
		
		tx.executeSql('INSERT INTO product_details (server_prod_id, name, description, update_timestamp, measurement_typeid, status, attribute_details, gallery, category) VALUES (?,?,?,?,?,?,?,?,?)',
   	    			[server_prod_id, name, description, update_timestamp, measurement_typeid, prod_status, attributeJson, galleryJson, categoryJson], function(tx, res) {
			console.log("PD insertId: " + res.insertId );
  	    });
	});
}

function successCBProdListDB() {
	if(parseInt(dataIsFromServer) == 0){
		downloadImagesOfProduct(productDetailsArrSession);
	}else{
		appendProdListDB(productDetailsArrSession);
	}
	
}	

function errorCBProdListDB(err) {
	console.log("errorCBProdListDB : "+err.message);
}

function successCBProdLocalDB() {
	console.log("successCBProdLocalDB");
}	

function errorCBProdLocalDB(err) {
	console.log("errorCBProdLocalDB : "+err.message);
}

function successCBInsertProductDetails() {
	 getAttributesDataFromServer();
}

function errorCBInsertProductDetails(err) {
	console.log("errorCBInsertProductDetails : "+err.message);
}

var appendCount=1;
function getProductsListFromLocal(){
	if(testingInBrowser){
		if(appendCount==1){
			appendCount=2;
		}
		
		var myArr= new Array();
		var myObject = new Object();
		myObject.id = 1;
		myObject.server_prod_id = 1;
		myObject.prod_name = "SHIRT - FULL SLEEVE";
		myObject.prod_description = "Fabric: Cotton Linen Blend Slim Fit, Full Sleeve Collar Type: Regular Pattern: Checkered Set of 1";
		myObject.measurement_typeid = "1";
		myObject.prod_status = "1";
		myObject.attribute_details = '[{"id":59,"pdt_id":"1","attr_id":"1","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}, {"id":59,"pdt_id":"1","attr_id":"2","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}]';
		myObject.category = '[{"id":40,"pdt_id":"1","cat_id":"1","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}]';
		myObject.gallery = '[{"id":9,"pdt_id":"1","image":"product_5_582ea8c053c3b.jpg","created_at":"2016-11-18 07:07:44","updated_at":"2016-11-18 07:07:44"}]';
			
		myArr.push(myObject);
		
		
		var myObject = new Object();
		myObject.id = 1;
		myObject.server_prod_id = 2;
		myObject.prod_name = "SHIRT - FULL PANT";
		myObject.prod_description = "Fabric: Woolan Blend Slim Fit Checkered Set of 1";
		myObject.measurement_typeid = "1";
		myObject.prod_status = "1";
		myObject.attribute_details = '[{"id":59,"pdt_id":"2","attr_id":"3","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}, {"id":59,"pdt_id":"2","attr_id":"4","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}]';
		myObject.category = '[{"id":40,"pdt_id":"2","cat_id":"3","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}]';
		myObject.gallery = '[{"id":8,"pdt_id":"2","image":"product_5_582ea8c053c3b.jpg","created_at":"2016-11-18 07:07:44","updated_at":"2016-11-18 07:07:44"}]';
			
		myArr.push(myObject);
		
		var myObject = new Object();
		myObject.id = 1;
		myObject.server_prod_id = 3;
		myObject.prod_name = "Women - Kurta";
		myObject.prod_description = "Fabric: Cotton Linen Blend Slim Fit, Full Sleeve Collar Type: Regular Pattern: Checkered Set of 1";
		myObject.measurement_typeid = "1";
		myObject.prod_status = "1";
		myObject.attribute_details = '[{"id":59,"pdt_id":"3","attr_id":"5","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}, {"id":59,"pdt_id":"3","attr_id":"6","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}]';
		myObject.category = '[{"id":40,"pdt_id":"3","cat_id":"5","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}]';
		myObject.gallery = '[{"id":9,"pdt_id":"3","image":"product_5_582ea8c053c3b.jpg","created_at":"2016-11-18 07:07:44","updated_at":"2016-11-18 07:07:44"}, {"id":11,"pdt_id":"3","image":"product_5_582ea8c053c3b.jpg","created_at":"2016-11-18 07:07:44","updated_at":"2016-11-18 07:07:44"}, {"id":10,"pdt_id":"3","image":"product_5_582ea8c053c3b.jpg","created_at":"2016-11-18 07:07:44","updated_at":"2016-11-18 07:07:44"}]';
			
		myArr.push(myObject);
		
		
		var myObject = new Object();
		myObject.id = 1;
		myObject.server_prod_id = 4;
		myObject.prod_name = "SHIRT - FULL PANT";
		myObject.prod_description = "Fabric: Woolan Blend Slim Fit Checkered Set of 1";
		myObject.measurement_typeid = "1";
		myObject.prod_status = "1";
		myObject.attribute_details = '[{"id":59,"pdt_id":"4","attr_id":"7","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}, {"id":59,"pdt_id":"4","attr_id":"8","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}]';
		myObject.category = '[{"id":40,"pdt_id":"4","cat_id":"9","created_at":"2016-11-21 06:02:58","updated_at":"2016-11-21 06:02:58"}]';
		myObject.gallery = '[{"id":8,"pdt_id":"4","image":"product_5_582ea8c053c3b.jpg","created_at":"2016-11-18 07:07:44","updated_at":"2016-11-18 07:07:44"}]';
			
		myArr.push(myObject);
		productDetailsArrSession=myArr;
		
		appendProdListDB(productDetailsArrSession);
		return;
	}
	
	db.transaction(	function (tx){
			tx.executeSql('select * from product_details ',[],function(tx,results){
					var len = results.rows.length;
					productDetailsArrSession = [];
					if(len>0){
						for (var i = 0; i < len; i++) {
							var jsonObj={};
							jsonObj['id'] = results.rows.item(i)['id'];
							jsonObj['server_prod_id'] = results.rows.item(i)['server_prod_id'];
							jsonObj['prod_name'] = results.rows.item(i)['name'];
							jsonObj['prod_description'] = results.rows.item(i)['description'];
							jsonObj['measurement_typeid'] = results.rows.item(i)['measurement_typeid'];
							jsonObj['prod_status'] = results.rows.item(i)['status'];
							jsonObj['attribute_details'] = results.rows.item(i)['attribute_details'];
							jsonObj['gallery'] = results.rows.item(i)['gallery'];
							jsonObj['category'] = results.rows.item(i)['category'];
							productDetailsArrSession.push(jsonObj);
						}
					}
				}, errorCB
			);
		},errorCBProdListDB,successCBProdListDB
	);
}

function insertAttributesDetails(tx) {
	var currDateTimestamp="";
	currDateTimestamp=dateTimestamp();
	tx.executeSql('CREATE TABLE IF NOT EXISTS product_attributes (id integer primary key autoincrement, server_attr_id integer, name text, identifier text, status integer, backend_name text, update_timestamp text, option text)');
	
	jQuery.each(attributeJsonData, function(index,value) {
		var server_attr_id = value['id'];
		var name = value['name'];
		var identifier = value['identifier'];
		var attr_status = value['status'];
		var backend_name = value['backend_name'];
		var optionJson = JSON.stringify(value['option']);
		var update_timestamp = currDateTimestamp;
		tx.executeSql('INSERT INTO product_attributes(server_attr_id, name, identifier, status, backend_name, update_timestamp, option) VALUES (?,?,?,?,?,?,?)',
   	    			[server_attr_id, name,identifier, attr_status, backend_name, update_timestamp, optionJson], function(tx, res) {
	   	         console.log("Attribute Data insertId: " + res.insertId + " -- res.rowsAffected 1"+res.rowsAffected);
  	    });
	});
}

function successCBAttrListDB() {
	if(parseInt(dataIsFromServer) == 0){
		downloadAttrOptionImages(attrDetailsArrSession);
	}
}	

function errorCBAttrListDB(err) {
	console.log("errorCBProdListDB : "+err.message);
}

function successCBInsertAttributeDetails() {
	 getMeasurementsDataFromServer();
	    
}	
function errorCBInsertAttributeDetails(err) {
	console.log("errorCBInsertAttributeDetails : "+err.message);
}

function successCBAttrLocalDB() {
}	

function errorCBAttrLocalDB(err) {
	console.log("errorCBAttrLocalDB : "+err.message);
}

function getAttributeListFromLocal(){
	if(testingInBrowser){
		var myArr= new Array();
		var myObject = new Object();
		myObject.id = 1;
		myObject.server_attr_id = 1;
		myObject.attr_name = "Attribute 1-shirt cuffs";
		myObject.identifier = "sss1";
		myObject.attr_status = "1";
		myObject.backend_name = "Backend shirt cuffs";
		myObject.option = '[{"id":1,"attr_id":"1","name":"a1-option1 cuffs1","image":"attribute_1_583285971f775.png","status":"1","sort_order":"0","created_at":"2016-11-02 19:40:34","updated_at":"2016-11-21 05:26:47"},{"id":2,"attr_id":"1","name":"a1-option2 cuffs2","image":"attribute_1_583285971fd42.png","status":"1","sort_order":"0","created_at":"2016-11-17 07:48:14","updated_at":"2016-11-21 05:26:47"},{"id":3,"attr_id":"1","name":"a1-option3 cuffs3","image":"attribute_1_58328597200e6.png","status":"1","sort_order":"0","created_at":"2016-11-21 05:26:47","updated_at":"2016-11-21 05:26:47"},{"id":4,"attr_id":"1","name":"a1-option4 cuffs4","image":"attribute_1_5832859720444.png","status":"1","sort_order":"0","created_at":"2016-11-21 05:26:47","updated_at":"2016-11-21 05:26:47"}]';
		
		myArr.push(myObject);
		
		var myObject = new Object();
		myObject.id = 2;
		myObject.server_attr_id = 2;
		myObject.attr_name = "Attribute 2-shirt Pocket";
		myObject.identifier = "sss2";
		myObject.attr_status = "1";
		myObject.backend_name = "shirt shirt Pocket";
		myObject.option = '[{"id":5,"attr_id":"2","name":"a2-option1 Pocket","image":"attribute_1_583285971f775.png","status":"1","sort_order":"0","created_at":"2016-11-02 19:40:34","updated_at":"2016-11-21 05:26:47"},{"id":6,"attr_id":"2","name":"a2-option2 Pocket","image":"attribute_1_583285971fd42.png","status":"1","sort_order":"0","created_at":"2016-11-17 07:48:14","updated_at":"2016-11-21 05:26:47"},{"id":7,"attr_id":"2","name":"a2-option3 Pocket","image":"attribute_1_58328597200e6.png","status":"1","sort_order":"0","created_at":"2016-11-21 05:26:47","updated_at":"2016-11-21 05:26:47"}]';
		myArr.push(myObject);
		
		var myObject = new Object();
		myObject.id = 2;
		myObject.server_attr_id = 3;
		myObject.attr_name = "Attribute 3-Pant Pocket";
		myObject.identifier = "pant1";
		myObject.attr_status = "1";
		myObject.backend_name = "Pant Pocket";
		myObject.option = '[{"id":8,"attr_id":"3","name":"a3-option1 Pocket","image":"attribute_1_583285971f775.png","status":"1","sort_order":"0","created_at":"2016-11-02 19:40:34","updated_at":"2016-11-21 05:26:47"},{"id":9,"attr_id":"3","name":"a3-option2 Pocket","image":"attribute_1_583285971fd42.png","status":"1","sort_order":"0","created_at":"2016-11-17 07:48:14","updated_at":"2016-11-21 05:26:47"},{"id":10,"attr_id":"3","name":"a3-option3 Pocket","image":"attribute_1_58328597200e6.png","status":"1","sort_order":"0","created_at":"2016-11-21 05:26:47","updated_at":"2016-11-21 05:26:47"},{"id":11,"attr_id":"3","name":"a3-option4 Pocket","image":"attribute_1_5832859720444.png","status":"1","sort_order":"0","created_at":"2016-11-21 05:26:47","updated_at":"2016-11-21 05:26:47"}, {"id":12,"attr_id":"3","name":"a3-option5 Pocket","image":"attribute_1_5832859720444.png","status":"1","sort_order":"0","created_at":"2016-11-21 05:26:47","updated_at":"2016-11-21 05:26:47"},{"id":13,"attr_id":"3","name":"a3-option6 Pocket","image":"attribute_1_5832859720444.png","status":"1","sort_order":"0","created_at":"2016-11-21 05:26:47","updated_at":"2016-11-21 05:26:47"}]';
		myArr.push(myObject);
		
		var myObject = new Object();
		myObject.id = 2;
		myObject.server_attr_id = 4;
		myObject.attr_name = "Attribute 4-Pant cuffs";
		myObject.identifier = "pant4";
		myObject.attr_status = "1";
		myObject.backend_name = "Pant cuffs";
		myObject.option = '[{"id":14,"attr_id":"4","name":"a4-option1 cuffs1","image":"attribute_1_583285971f775.png","status":"1","sort_order":"0","created_at":"2016-11-02 19:40:34","updated_at":"2016-11-21 05:26:47"},{"id":15,"attr_id":"3","name":"a4-option2 cuffs2","image":"attribute_1_583285971fd42.png","status":"1","sort_order":"0","created_at":"2016-11-17 07:48:14","updated_at":"2016-11-21 05:26:47"},{"id":16,"attr_id":"4","name":"a4-option3 cuffs3","image":"attribute_1_58328597200e6.png","status":"1","sort_order":"0","created_at":"2016-11-21 05:26:47","updated_at":"2016-11-21 05:26:47"},{"id":17,"attr_id":"4","name":"a4-option4 cuffs4","image":"attribute_1_5832859720444.png","status":"1","sort_order":"0","created_at":"2016-11-21 05:26:47","updated_at":"2016-11-21 05:26:47"}, {"id":18,"attr_id":"4","name":"a4-option5 Pocket","image":"attribute_1_5832859720444.png","status":"1","sort_order":"0","created_at":"2016-11-21 05:26:47","updated_at":"2016-11-21 05:26:47"}]';
		myArr.push(myObject);
		
		
		attrDetailsArrSession=myArr;
		getOrderListFromLocalDB();
		return;
	}
	
	db.transaction(	function (tx){
		var len = 0;
			tx.executeSql('select * from product_attributes ',[],function(tx,results){
					len = results.rows.length;
					if(len>0){
						attrDetailsArrSession = [];
						for (var i = 0; i < len; i++) {
							var jsonObj={};
							jsonObj.id = results.rows.item(i)['id'];
							jsonObj.server_attr_id = results.rows.item(i)['server_attr_id'];
							jsonObj.attr_name = results.rows.item(i)['name'];
							jsonObj.identifier = results.rows.item(i)['identifier'];
							jsonObj.attr_status = results.rows.item(i)['status'];
							jsonObj.backend_name = results.rows.item(i)['backend_name'];
							jsonObj.option = results.rows.item(i)['option'];
							attrDetailsArrSession.push(jsonObj);
						}
					}
				}, errorCB
			);
		},errorCBAttrListDB,successCBAttrListDB
	);
}

function insertMeasurementsDetails(tx) {
	var currDateTimestamp="";
	currDateTimestamp=dateTimestamp();
	tx.executeSql('CREATE TABLE IF NOT EXISTS measurement_details (id integer primary key autoincrement, name text, server_measurement_id integer, status integer, update_timestamp text, group_data text)');
	
	jQuery.each(measurementJsonData, function(index,value) {
		
		var server_measurement_id = value["id"];
		var name = value["name"];
		var meas_status = value["status"];
		var groupJson = '';
		if(value["group"] != ''){
			groupJson = JSON.stringify(value["group"]);
		}
		var update_timestamp = currDateTimestamp;
		tx.executeSql('INSERT INTO measurement_details(name, server_measurement_id, status, update_timestamp, group_data) VALUES (?,?,?,?,?)',
   	    			[name, server_measurement_id,meas_status, update_timestamp, groupJson], function(tx, res) {
			console.log("Measurement Data insertId: " + res.insertId + " -- res.rowsAffected 1"+res.rowsAffected);
  	    });
	});
}

function getMeasumentListFromLocal(){
	if(testingInBrowser){
		var myArr= new Array();
		var myObject = new Object();
		myObject.id = 1;
		myObject.server_measurement_id = 1;
		myObject.measurement_name = "Mens";
		myObject.status = "1";
		myObject.group_data = '[{"id":1,"name":"Shirts","status":"1","measurement_type_id":"1","created_at":"2016-11-02 23:28:53","updated_at":"2016-11-03 00:00:31","measurements":[{"id":1,"name":"Shirt collar1","status":"1","measurement_group_id":"1","created_at":"2016-11-02 23:28:53","updated_at":"2016-11-03 00:00:31"},{"id":2,"name":"shirt neck2","status":"1","measurement_group_id":"1","created_at":"2016-11-02 23:28:53","updated_at":"2016-11-03 00:00:31"}]},{"id":3,"name":"tee shirt","status":"1","measurement_type_id":"1","created_at":"2016-11-03 00:22:40","updated_at":"2016-11-03 00:22:40","measurements":[{"id":7,"name":"round neck","status":"1","measurement_group_id":"3","created_at":"2016-11-03 00:22:40","updated_at":"2016-11-03 00:22:40"},{"id":8,"name":"with collar","status":"1","measurement_group_id":"3","created_at":"2016-11-03 00:22:40","updated_at":"2016-11-03 00:22:40"}]},{"id":4,"name":"shorts","status":"1","measurement_type_id":"1","created_at":"2016-11-08 18:32:49","updated_at":"2016-11-08 18:32:49","measurements":[{"id":9,"name":"elbow length","status":"1","measurement_group_id":"4","created_at":"2016-11-08 18:32:49","updated_at":"2016-11-17 07:50:56"},{"id":16,"name":"back","status":"1","measurement_group_id":"4","created_at":"2016-11-17 07:50:56","updated_at":"2016-11-17 07:50:56"},{"id":17,"name":"front","status":"1","measurement_group_id":"4","created_at":"2016-11-17 07:50:56","updated_at":"2016-11-17 07:50:56"}]}]';
		myArr.push(myObject);
		measurementArrSession=myArr;
		
		appendMeasurementDataInDiv(measurementArrSession);
		return;
	}
	
	db.transaction(	function (tx){
		var len = 0;
			tx.executeSql('select * from measurement_details ',[],function(tx,results){
					len = results.rows.length;
					if(len>0){
						measurementArrSession = [];
						for (var i = 0; i < len; i++) {
							var jsonMeasurementObj={};
							jsonMeasurementObj['id'] = results.rows.item(i)['id'];
							jsonMeasurementObj['server_measurement_id'] = results.rows.item(i)['server_measurement_id'];
							jsonMeasurementObj['measurement_name'] = results.rows.item(i)['name'];
							jsonMeasurementObj['status'] = results.rows.item(i)['status'];
							jsonMeasurementObj['group_data'] = results.rows.item(i)['group_data'];
							measurementArrSession.push(jsonMeasurementObj);
						}
					}
				}, errorCB
			);
		},errorCBMeasurementListDB,successCBMeasurementListDB
	);
}

function successCBMeasurementListDB() {
	appendMeasurementDataInDiv(measurementArrSession);
}	

function errorCBMeasurementListDB(err) {
	console.log("errorCBMeasurementListDB : "+err.message);
}

function insertOrderDetails(){
	var prodHtmlName = $('#prodHtmlName').val();
	var productHTMLId = $('#prodHtmlId').val();
	var categoryHtmlId = $('#categoryHtmlId').val();
	var newOrderId = $('#newOrderId').val();
	var customerIdInput = $('#customerIdInput').val();
	var currDateTimestamp="";
	currDateTimestamp=dateTimestamp();
	if(newOrderId == '' || newOrderId == undefined){
		db.transaction(function(tx) {
			
			tx.executeSql('CREATE TABLE IF NOT EXISTS order_details(id integer primary key autoincrement, server_cat_id integer, server_prod_id integer, order_data text,update_timestamp text, server_prod_name text,customer_id integer, option_selected text, status_of_order text, gallery_id integer, gallery_name text)');
			
				var server_cat_id = categoryHtmlId;
				var server_prod_id = productHTMLId;
				var order_data = orderTakenDetails;
				var update_timestamp=currDateTimestamp;
				var server_prod_name = prodHtmlName;
				var optionIdsWithArrays = selectedOptionMain;
				var customer_id = customerIdInput;
				var status_of_order = 'Pending';
				
				tx.executeSql('INSERT INTO order_details(server_cat_id, server_prod_id, order_data, update_timestamp, server_prod_name, customer_id, option_selected, status_of_order, gallery_id, gallery_name) VALUES (?,?,?,?,?,?,?,?,?,?)',
							[server_cat_id, server_prod_id, order_data, update_timestamp,server_prod_name, customer_id, optionIdsWithArrays, status_of_order, galleryIdToSave, galleryNameToSave], function(tx, res) {
					//alert("Order Data insertId: " + res.insertId + " -- res.rowsAffected 1"+res.rowsAffected);
					$('#newOrderId').val(res.insertId);
				});
			
		},errorCBInsertOrderDetails, successCBInsertOrderDetails);
	}
}

function successCBInsertOrderDetails() {
	if(testingInBrowser){
		takeCustomerDetailsFn();
	}else{
		alert('Order is successfully completed.');
		getOrderListFromLocalDB();
	}
}	

function errorCBInsertOrderDetails(err) {
	console.log("errorCBInsertOrderDetails : "+err.message);
}

function customerAndOrderDetailFn(){
	insertOrderDetails();
}

function orderPageHtmlButton(){
	getOrderListFromLocalDB();
}

function getOrderListFromLocalDB(){
	if(testingInBrowser){
		
		var myArr= new Array();
		var myObject = new Object();
		myObject.id = 1;
		myObject.server_cat_id = 1;
		myObject.server_prod_id = 2;
		myObject.order_data = '[{"measPKId":18, "measName":"RoundNeck", "inputValue":"25"},{"measPKId":19, "measName":"VShape", "inputValue":"30"},{"measPKId":20, "measName":"Chest", "inputValue":"45"},{"measPKId":21, "measName":"Arms", "inputValue":"20"}]';
		myObject.server_prod_name = 'Shirt';
		myObject.update_timestamp = '12-11-2016 13:15:15';
		myObject.status_of_order = 'Completed';
		myObject.customer_id = 1;
		myArr.push(myObject);
		
		var myObject = new Object();
		myObject.id = 1;
		myObject.server_cat_id = 1;
		myObject.server_prod_id = 3;
		myObject.order_data = '[{"measPKId":18, "measName":"RoundNeck", "inputValue":"25"},{"measPKId":19, "measName":"VShape", "inputValue":"30"},{"measPKId":20, "measName":"Chest", "inputValue":"45"},{"measPKId":21, "measName":"Arms", "inputValue":"20"}]';
		myObject.server_prod_name = 'T-Shirt';
		myObject.update_timestamp = '12-11-2016 13:15:15';
		myObject.status_of_order = 'InProgress';
			myObject.customer_id = 1;
		myArr.push(myObject);
		
		var myObject = new Object();
		myObject.id = 1;
		myObject.server_cat_id = 1;
		myObject.server_prod_id = 3;
		myObject.order_data = '[{"measPKId":18, "measName":"RoundNeck", "inputValue":"25"},{"measPKId":19, "measName":"VShape", "inputValue":"30"},{"measPKId":20, "measName":"Chest", "inputValue":"45"},{"measPKId":21, "measName":"Arms", "inputValue":"20"}]';
		myObject.server_prod_name = 'Pant';
		myObject.update_timestamp = '12-11-2016 13:15:15';
		myObject.status_of_order = '';
		myObject.customer_id = 2;
		myArr.push(myObject);
		
		var myObject = new Object();
		myObject.id = 1;
		myObject.server_cat_id = 1;
		myObject.server_prod_id = 2;
		myObject.order_data = '[{"measPKId":18, "measName":"RoundNeck", "inputValue":"25"},{"measPKId":19, "measName":"VShape", "inputValue":"30"},{"measPKId":20, "measName":"Chest", "inputValue":"45"},{"measPKId":21, "measName":"Arms", "inputValue":"20"}]';
		myObject.server_prod_name = 'Chaddi';
		myObject.update_timestamp = '12-11-2016 13:15:15';
		myObject.status_of_order = '';
		myObject.customer_id = 2;
		myArr.push(myObject);
		orderArrSession=myArr;
		getCustomerListFromLocalDB();
		return;
	}
	
	db.transaction(	function (tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS order_details(id integer primary key autoincrement, server_cat_id integer, server_prod_id integer, order_data text,update_timestamp text, server_prod_name text,customer_id integer, option_selected text, status_of_order text, gallery_id integer, gallery_name text)');
		var len = 0;
			tx.executeSql('select * from order_details ',[],function(tx,results){
					len = results.rows.length;
					if(len>0){
						orderArrSession = [];
						for (var i = 0; i < len; i++) {
							var jsonOrderDataObj={};
							jsonOrderDataObj['id'] = results.rows.item(i)['id'];
							jsonOrderDataObj['server_cat_id'] = results.rows.item(i)['server_cat_id'];
							jsonOrderDataObj['server_prod_id'] = results.rows.item(i)['server_prod_id'];
							jsonOrderDataObj['order_data'] = results.rows.item(i)['order_data'];
							jsonOrderDataObj['update_timestamp'] = results.rows.item(i)['update_timestamp'];
							jsonOrderDataObj['server_prod_name'] = results.rows.item(i)['server_prod_name'];
							jsonOrderDataObj['customer_id'] = results.rows.item(i)['customer_id'];
							jsonOrderDataObj['option_selected'] = results.rows.item(i)['option_selected'];
							jsonOrderDataObj['status_of_order'] = results.rows.item(i)['status_of_order'];
							orderArrSession.push(jsonOrderDataObj);
						}
					}
				}, errorCB
			);
		},errorCBOrderListDB,successCBOrderListDB
	);

}

function successCBOrderListDB() {
	//console.log('successCBOrderListDB');
	getCustomerListFromLocalDB();
}	

function errorCBOrderListDB(err) {
	console.log("errorCBOrderListDB : "+err.message);
}

function takeCustomerDetailsFn(){
	if(testingInBrowser){
		getOrderListFromLocalDB();
		return;
	}
	var currDateTimestamp="";
	currDateTimestamp=dateTimestamp();
	var customerName = $('#customerNameInput').val();
	var totalPriceInput = $('#totalPriceInput').val();
	var advancePriceInput = '';
	var balancePriceInput = '';
	var contactNumber = $('#contactNumberInput').val();
	var address1Input = $('#address1Input').val();
	var address2Input = $('#address2Input').val();
	var emailIdInput = $('#emailIdInput').val();
	var countryInput = '';
	var stateInput = $('#stateInput').val();
	var cityInput = $('#cityInput').val();
	var pincodeInput = $('#pincodeInput').val();
	var customerIdInput = $('#customerIdInput').val();
	if(customerIdInput == '' || customerIdInput == undefined){
		db.transaction(function(tx) {
			
			tx.executeSql('CREATE TABLE IF NOT EXISTS customer_details (id integer primary key autoincrement,name text, total_price text, advance_price text, balance_price text, update_timestamp text, contact_number text, email_id text, country text, state text, city text, pincode text, address_one text, address_two text)');
			
				var update_timestamp=currDateTimestamp;
				
				tx.executeSql('INSERT INTO customer_details(name, total_price, advance_price, balance_price, update_timestamp, contact_number, email_id, country, state, city, pincode, address_one, address_two) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
						[customerName, totalPriceInput, advancePriceInput, balancePriceInput, update_timestamp, contactNumber, emailIdInput, countryInput, stateInput, cityInput, pincodeInput, address1Input, address2Input], function(tx, res) {
					//alert("Customer Details insertId: " + res.insertId + " -- res.rowsAffected 1"+res.rowsAffected);
					$('#customerIdInput').val(res.insertId);
				});
			
		},errorCBInsertCustomerDetails, successCBInsertCustomerDetails);
	}else{
		insertOrderDetails();
	}
}

function successCBInsertCustomerDetails() {
	
	insertOrderDetails();
}	

function errorCBInsertCustomerDetails(err) {
	console.log("errorCBInsertCustomerDetails"+ err.message);
}

function getCustomerListFromLocalDB(){
	if(testingInBrowser){
		
		var myArr= new Array();
		var myObject1 = new Object();
		myObject1.id = 1;
		myObject1.name = 'KRISHNA';
		myObject1.price = 150;
		myObject1.contact_number = '9999999999';
		myObject1.address_details = 'bangalore';
		myObject1.update_timestamp = '';
		myArr.push(myObject1);
		
		var myObject2 = new Object();
		myObject2.id = 2;
		myObject2.name = 'Ramesh';
		myObject2.price = 180;
		myObject1.contact_number = '8888888888';
		myObject1.address_details = 'Mysore';
		myObject2.update_timestamp = '12-11-2016 13:15:15';
		myArr.push(myObject2);
				
		customerArrSession=myArr;
		appendOrderAndCustomerDetails(orderArrSession, customerArrSession);
		return;
	}
	
	db.transaction(	function (tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS customer_details (id integer primary key autoincrement,name text, total_price text, advance_price text, balance_price text, update_timestamp text, contact_number text, email_id text, country text, state text, city text, pincode text, address_one text, address_two text)');
		var len = 0;
		//name, price, update_timestamp
			tx.executeSql('select * from customer_details ',[],function(tx,results){
					len = results.rows.length;
					if(len>0){
						customerArrSession = [];
						for (var i = 0; i < len; i++) {
							var jsonCustomerDataObj={};
							jsonCustomerDataObj['id'] = results.rows.item(i)['id'];
							jsonCustomerDataObj['name'] = results.rows.item(i)['name'];
							jsonCustomerDataObj['total_price'] = results.rows.item(i)['total_price'];
							jsonCustomerDataObj['advance_price'] = results.rows.item(i)['advance_price'];
							jsonCustomerDataObj['total_price'] = results.rows.item(i)['total_price'];
							jsonCustomerDataObj['update_timestamp'] = results.rows.item(i)['update_timestamp'];
							jsonCustomerDataObj['contact_number'] = results.rows.item(i)['contact_number'];
							jsonCustomerDataObj['address_one'] = results.rows.item(i)['address_one'];
							jsonCustomerDataObj['address_two'] = results.rows.item(i)['address_two'];
							jsonCustomerDataObj['email_id'] = results.rows.item(i)['email_id'];
							jsonCustomerDataObj['country'] = results.rows.item(i)['country'];
							jsonCustomerDataObj['state'] = results.rows.item(i)['state'];
							jsonCustomerDataObj['city'] = results.rows.item(i)['city'];
							jsonCustomerDataObj['pincode'] = results.rows.item(i)['pincode'];
							
							customerArrSession.push(jsonCustomerDataObj);
						}
					}
				}, errorCB
			);
		},errorCBCustomerListDB,successCBCustomerListDB
	);

}

function successCBCustomerListDB() {
	appendOrderAndCustomerDetails(orderArrSession, customerArrSession);
}	

function errorCBCustomerListDB(err) {
	console.log("errorCBOrderListDB :"+err.message);
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
	    
	    var dateTimeStampTemp = yyyy +'-'+ month +'-'+ dd +"_"+ hh +':'+ mm +':'+ ss +' '+ mss;
	    return dateTimeStampTemp;
	}
	
	function addZero(x,n) {
    while (x.toString().length < n) {
        x = "0" + x;
    }
    return x;
}
/*  ------------------- Common Methods/Function Code Ends -------------------------  */


/*  ------------------- Module-wise Methods/Function Code Starts ------------------  */	
	function getCountByTableName(tablename){
	    var x;
	   
	    console.log(tablename);
	    db.transaction(function(tx) {
	    	if(tablename == 'tailor_details'){
	    		tx.executeSql('CREATE TABLE IF NOT EXISTS tailor_details (id integer primary key autoincrement, server_td_id integer, first_name text, middle_name text, last_name text, business_title text, address1 text, address2 text, email text, contact1 text, contact2 text, secret_key text, tailor_status integer, city text, pincode text, state_id integer, country_id integer, state_name text, country_name text, update_timestamp text)');
	    	}else if(tablename == 'category'){
	    		tx.executeSql('CREATE TABLE IF NOT EXISTS category(id integer primary key autoincrement, server_cat_id integer, parent_id integer,name text,update_timestamp text, description text, catImage text, catStatus integer, children text)');
	    	}
	    	
	        tx.executeSql('select count(*) as mycount from '+tablename+' ', [], function(tx, rs) {
	          console.log('Record count (expected to be 2): ' + rs.rows.item(0).mycount);
	          var recordCount = 0;
	          recordCount = rs.rows.item(0).mycount;
	          if(parseInt(recordCount) > 0){
	        	  dataIsFromServer = 1;
	        	  if(tablename == 'tailor_details'){
	        		  //console.log('getTailorDetailsFromLocal');
	        		  getTailorDetailsFromLocal();
	        	  }else if(tablename == 'category'){
	        		 // console.log('getCategoriesListFromLocal');
	        		  getCategoriesListFromLocal();
	        	  }
	          }else if(parseInt(recordCount) == 0){
	        	  if(tablename == 'tailor_details'){
	        		  if(loginUserId == undefined || loginUserId == ''){
	        			  gotoLoginPage();
	        			}else if(loginUserId != undefined){
	        				if(loginUserId != ''){
	        					getTailorDetailsDataFromServer();
	        				}
	        				
	        			}
	        		  
	        	  }else if(tablename == 'category'){
	        		  //console.log('getCategoriesDataFromServer');
	        		  getCategoriesDataFromServer();
	        	  }
	          }
	        }, function(tx, error) {
	          console.log('SELECT error: ' + error.message);
	        });
	      });
	    return x;
	}
	
	function errorCountDBFn(err){
		console.log('errorCountDBFn : '+err.message);
		console.log('errorCountDBFn : '+err.code);
	}
	
	function checkTailorDetailsInLocalDB(){
		
		getCountByTableName("tailor_details");
	}
	
	function checkCategoryInLocalDB(){
		
		getCountByTableName("category");
	}
	
	function loadDataFromServer(){
		if(testingInBrowser){
			getTailorDetailsFromLocal();
			return;
		}
		checkTailorDetailsInLocalDB();
	}
	
	
	var productImageData = 'http:\/\/tailorapp.tailorrani.com\/images\/Products\/product_image';
	var attributeImageData = 'http:\/\/tailorapp.tailorrani.com\/images\/Attributes\/attribute_image';
	var localPath = 'file:///data/data/com.stavyah.tailorrani/files/';

	function getCategoriesDataFromServer(){
		var dataToSend = {};
		dataToSend["secret_key"] = tailorDetailsSession.secret_key;
		var apiCallUrl="http://tailorapp.tailorrani.com/api/categories/categoriesJson"
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
		// FIXME CHECK JSON DATA
		insertCategories(categoriesJsonData);
	}
	
	function appendCatListDB(catArrData, subCatArrData) {
		//$("#mainPageId").find('.main-menu').remove();
		//$("#mainPageId").find('.sub-menu').remove();
		var categoryDiv = '<div class="row main-menu main-menu-div" id="main-menu-div" ><ul class="topnav main-menu-ul" id="main-menu-ul">';
		var subCategoryDiv = "";
		$('#newOrderId').val('');
		$('#customerIdInput').val('');
		jQuery.each(catArrData, function(index,value) {
			//console.log('subCategoryDiv : '+catArrData);
			var jsonObj=value;
			var primaryCKeyId=jsonObj["id"];
			var server_cat_id=jsonObj["server_cat_id"];
			var name=jsonObj["name"];
			var children=jsonObj["children"];
			var uniqueId = name+'_'+server_cat_id;
			categoryDiv+='<li class="" data-submenuid="'+uniqueId
					+'" data-cat_id="'+server_cat_id+'" data-lid="'+primaryCKeyId
					+'" data-isparent="0" onclick="menuCategoryOne(this);"> <a href="#">'+name+'</a> </li>';
			if(children != 0){
				var subCategoryTempDiv="";
				var isExist = false;
				jQuery.each(subCatArrData, function(indexObj,valueObj) {
					//console.log('subCatArrData : '+subCatArrData);
					var childJsonObj = valueObj;
					var child_parent_id = childJsonObj["parent_id"];
					var primarySCKeyId = childJsonObj["id"];
					var server_cat_child_id = childJsonObj["server_cat_id"];
					var child_name = childJsonObj['name'];
					if(parseInt(server_cat_id) == parseInt(child_parent_id)){
						isExist = true;
						subCategoryTempDiv += '<li class="childSubMenuClass" data-lid="'+primarySCKeyId+
							'" data-parcat_id="'+child_parent_id+'" data-isparent="1" data-cat_id="'+server_cat_child_id+'" onclick="mainGalleryFn(this);"><a href="#">'+ child_name +'</a></li>';
					}
				});
				
				if(isExist){
					var subCategoryDivFirst = '<div class="row sub-menu sub-menu-div '+uniqueId+' " id="'+uniqueId+'"><ul class="topnav sub-menu-ul" id="sub-menu-ul">';
					subCategoryTempDiv = subCategoryDivFirst + subCategoryTempDiv + '</ul></div>';
				}
				subCategoryDiv += subCategoryTempDiv;
			}
		});
		categoryDiv+='<li class="float-right" onclick="orderPageHtmlButton();"> <a href="#"> Order Report </a> </li>';
		categoryDiv+='</ul></div>';
		$('#mainPageId').empty();
		$('#mainPageId').append(categoryDiv);
		$('#mainPageId').append(subCategoryDiv);
		$('#mainPageId').append('<div class="row hrBarCatClass"> <hr></div>');
		$('#mainPageId').append('<div class="row product-list">	</div>');
		//$( categoryDiv ).insertBefore( "#mainPageId .hrBarCatClass" );
		//$( subCategoryDiv ).insertBefore( "#mainPageId .hrBarCatClass" );
		$('#mainPageId').find('.sub-menu').hide();
		
		getProductsListFromLocal();
		//getAttributeListFromLocal();
		//gotoHome();
		getOrderListFromLocalDB();
	}
	
	// Remaining
	function getProductDataFromServer(){
		var dataToSend = {};
		dataToSend["secret_key"] = tailorDetailsSession.secret_key;
		var apiCallUrl="http://tailorapp.tailorrani.com/api/products/productsJson"
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
		productImageData = responseJson['image_url'];
		// FIXME CHECK JSON DATA
		db.transaction(insertProductDetails, errorCBInsertProductDetails, successCBInsertProductDetails);
	}
	
	function getAttributesDataFromServer(){
		var dataToSend = {};
		dataToSend["secret_key"] = tailorDetailsSession.secret_key;
		var apiCallUrl="http://tailorapp.tailorrani.com/api/attributes/attributesJson"
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
		attributeImageData = responseJson['image_url'];
		// FIXME CHECK JSON DATA
		db.transaction(insertAttributesDetails, errorCBInsertAttributeDetails, successCBInsertAttributeDetails);
	}
	
	function downloadImagesOfProduct(prodArrDataToDownload){
		prodArrDataToDownload = productDetailsArrSession;
		var i = 0;
		var folder = 'gallery';
		jQuery.each(prodArrDataToDownload, function(index,value) {
			var jsonObj=value;
			var galleryObj = '';
			galleryObj = jQuery.parseJSON(jsonObj['gallery']);
			if(jsonObj['gallery'] != ''){
				var galleryObject = new Object();
				jQuery.each(galleryObj , function(indexObj,valueObj) {
					var galleryArrObject = new Array();
					var gallery_id = valueObj['id'];
					var image = valueObj["image"];
					//downloadFile(gallery_id, image, 'product');
					var downloadFileUrl = productImageData + '/' + image;
					downloadFileValidatorFn(downloadFileUrl, folder, image);
				});
			}
			i = parseInt(i) + 1;
		});
		if(i == prodArrDataToDownload.length){
			appendProdListDB(productDetailsArrSession);
		}
	}
	
	function appendProdListDB(prodArrData) {
		prodArrData = productDetailsArrSession;
		var mainPageGallery = '';
		var attrMeasPageGallery = '';
		jQuery.each(prodArrData, function(index,value) {
			var jsonObj=value;
			var local_db_id=jsonObj["id"];
			var server_prod_id=jsonObj["server_prod_id"];
			var prod_name=jsonObj["prod_name"];
			var prod_description=jsonObj["prod_description"];
			var galleryObj = '';
			var categoryObj = '';
			galleryObj = jQuery.parseJSON(jsonObj['gallery']);
			categoryObj = jQuery.parseJSON(jsonObj['category']);
			 
			if(jsonObj['gallery'] != ''){
				jQuery.each(galleryObj , function(indexObj,valueObj) {
					var gallery_id = valueObj['id'];
					var image = valueObj["image"];
					var prodImage = '';
					//var prodImage = productImageData + '/'+image; // Direct Hitting to server URL
					//var prodImage = window.appRootDir.fullPath + '/' + gallery_id+'_'+image;
					if(testingInBrowser){
						prodImage = 'img/product'+indexObj+'.jpg'; // For Testing
					}else{
						prodImage = localPath + "/" + 'gallery'+ '/' + image; // For Production
					}
					//var prodImage = localPath + "/" + 'gallery'+ '/' + image; // For Production
					//var prodImage = 'img/product'+indexObj+'.jpg'; // For Testing
					if(jsonObj['category'] != ''){
						jQuery.each(categoryObj, function(indexCat, valueCat){
							var server_cat_id = valueCat['cat_id'];
							var galleryImage = '<div class="col-xs-6 col-sm-6 col-md-4 width-product-list col-lg-4 galleriesClass gallcatid'+server_cat_id+'" data-gall_id="'+gallery_id+'" data-cat_id="'+server_cat_id+'" '+
									'data-prod_id="'+server_prod_id+'" data-pro_index="'+index+'" data-prod_name="'+prod_name+'" data-lid="'+local_db_id+'" onclick="goToAttributeDiv(this)">';
									
							galleryImage+= '<img class="product-image" src="'+prodImage+'"  alt="'+prod_name+'" />'
							galleryImage+= '<p>'+prod_name+'</p>';
							galleryImage+= '</div>';
							
							mainPageGallery += galleryImage;
							
						});
					}
				});
			}
			
		});
		$("#mainPageId").find('.galleriesClass').remove();
		$("#mainPageId").find('.product-list').append(mainPageGallery);
		$('#mainPageId .product-list').find('.galleriesClass').hide();
		//$('.product-selection-details-div').empty();
		
		getAttributeListFromLocal();
	}

	var galleryIdToSave = '';
	var galleryNameToSave = '';
	function goToAttributeDiv(currentData){
		$('.selection-menu').each(function(index){
			$(this).find('ul li').removeClass("active").find('a').removeClass("active");
			
			$(this).find('ul li').first().addClass("active").find('a').addClass("active");
		});
		
		var gallCurrId = $(currentData).data('gall_id');
		var pro_index = $(currentData).data('pro_index');
		var prodName = $(currentData).data('prod_name');
		var categoryId = $(currentData).data('cat_id');
		var productId = $(currentData).data('prod_id');
		$('#prodHtmlName').val(prodName);
		$('#prodHtmlId').val(productId);
		$('#categoryHtmlId').val(categoryId);
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
			var galleryArr = jQuery.parseJSON(jsonObj.gallery);
			var categoryObj = jQuery.parseJSON(jsonObj.category);
			var attributeObj = jQuery.parseJSON(jsonObj.attribute_details);
			if(productId == server_prod_id){
				if(jsonObj.gallery != ''){
					var $prodSelDetailsDiv =$('.product-selection-details-div');
					$prodSelDetailsDiv.find('p.product-name').html(prod_name);
					
					if(galleryArr.length>0){
						
						var $galleryImagesList=$prodSelDetailsDiv.find('.gallery-images-list');
						$galleryImagesList.find('li').remove();
						
						jQuery.each(galleryArr, function(indexGal, valueGal){
							var galId = valueGal['id'];
							var image = valueGal['image'];
							
							measurementTypeId = jsonObj['measurement_typeid'];
							var prodImageSrc = '';
							if(testingInBrowser){
								prodImageSrc = 'img/product'+indexGal+'.jpg';// For Testing
							}else{
								prodImageSrc = localPath + "/" + 'gallery'+ '/' +image;// For Production
							}
							//var prodImageSrc = 'img/product'+indexGal+'.jpg';// For Testing
							
							//var prodImageSrc = window.appRootDir.fullPath + '/' + galId+'_'+image;
							//var prodImageSrc = localPath + "/" + 'gallery'+ '/' +image;
							//var prodImageSrc = productImageData + '/'+image; // Direct Hitting to server URL
							//initToCheckTheFile(image, productImageData);
							
							var activeClass="";
							if(galId == gallCurrId){
								galleryIdToSave = gallCurrId;
								galleryNameToSave = image;
								$('.product-image-div-landscape img').attr("src", prodImageSrc);
								$prodSelDetailsDiv.find('.galleryImageClass img').attr("src", prodImageSrc);
								activeClass="active";
							}
							var liObj='<li class="childGalleryClass"><img src="'+prodImageSrc+'" data-childgalid="'+galId+'" data-gallname="'+image+'" class="'+activeClass+' gallCIndClassId'+galId+'" style="width: 200px;" onclick="changeGallInAttMeaCusFn(this)"></li>';
							$galleryImagesList.append(liObj);
						});
					}
				}
			}
			//$(".imageAppendSelMea").pinchzoomer();
			
			var mainPageCatId = $(currentData).data('cat_id');
			var mainPageProdId = $(currentData).data('prod_id');
			if(jsonObj.category != ''){
				jQuery.each(categoryObj, function(indexCat, valueCat){
					var server_cat_id = valueCat['cat_id'];
					if(mainPageCatId == server_cat_id && mainPageProdId == server_prod_id){
						jQuery.each(attributeObj, function(indexObj,valueObj) {
							var paIds = valueObj['id'];
							var attrId = valueObj['attr_id'];
							prodAttrIds[indexObj] = paIds;
							attrIds[indexObj] = attrId;
						});
						if(attrIds.length > 0){
							appendAttrDataByArraysAndIds(prodAttrIds, attrIds, server_cat_id, server_prod_id);
						}else{
							getMeasumentListFromLocal();
							showMeasurementDiv();
							showGalleryDivTag();
						}
					}
				});
			}
		});
	}
	
	function showGalleryImage(){
		//popupbeforeposition: function() {
            var maxHeight = $( window ).height() - 60 + "px";
            $( ".photopopup img" ).css( "max-height", maxHeight );
      //  }
	}
	
	function changeGallInAttMeaCusFn(dataObj){
		var $prodSelDetailsDiv =$('.product-selection-details-div');
		var $galleryImagesList=$prodSelDetailsDiv.find('.gallery-images-list');
		var srcOfOnClick = $(dataObj).attr('src');
		var gallCldIndId = $(dataObj).data('childgalid');
		galleryIdToSave = gallCldIndId;
		var gallName = $(dataObj).data('gallname');
		galleryNameToSave = gallName;
			var imageToActive = $prodSelDetailsDiv.find('.galleryImageClass img').attr("src", srcOfOnClick);
			$('.product-image-div-landscape img').attr("src", srcOfOnClick);
			var activeClass="active";
			$galleryImagesList.find('img').removeClass(activeClass);
			$galleryImagesList.find('.gallCIndClassId'+gallCldIndId).addClass(activeClass);
	}
	
	function downloadAttrOptionImages(attrDetailsArrSession){
		var folder = 'attributes';
		jQuery.each(attrDetailsArrSession, function(index,value) {
			if(value['option'] != ''){
				var optionObj = jQuery.parseJSON(value['option']);
				jQuery.each(optionObj, function(index2,value2) {
					var optionId = value2['id'];
					var optionName = value2['name'];
					var optionImg = value2['image'];
					//downloadFile(optionId, optionImg, 'attrOption');
					var downloadFileUrl = attributeImageData + '/' + optionImg;
					downloadFileValidatorFn(downloadFileUrl, folder, optionImg);
				});
			}
		});
		dataIsFromServer = 1;
	}
	var attributeForNextIndex = 0;
	var attriOptionExist = false;
	function appendAttrDataByArraysAndIds(prodAttrArr, attrArr, catId, prodId){
		var attributeDiv = '';
		var optionMainDiv = '';
		var attrTempId = 0;
		attributeForNextIndex = 0;
		jQuery.each(attrDetailsArrSession, function(index,value) {
			var attrId = value['id'];
			var server_attr_id = value['server_attr_id'];
			var attr_name = value['attr_name'];
			var identifier = value['identifier'];
			var backend_name = value['backend_name'];
			var option = value['option'];
			
			if(value['option'] != ''){
				jQuery.each(attrArr, function(index1,value1) {
					if(value1 == server_attr_id){
						attriOptionExist = true;
						var optionObj = jQuery.parseJSON(option);
						
						var tempAttrDiv = '<li class="selMenu-bar subMen_attrId'+server_attr_id+' main_attr_ind'+attributeForNextIndex+'" data-main_attind="'+attributeForNextIndex+'" data-cat_id="'+catId+'" data-prod_id="'+prodId+'" data-attrid="'+server_attr_id+'" data-lid="'+attrId+'"><a href="#" onclick="getOptionByAttrId(this);" data-main_attinda="'+attributeForNextIndex+'" data-attri_id="'+server_attr_id+'">'+attr_name+'</a></li>';
						if(attributeDiv == ''){
							attrTempId = server_attr_id;
						}
						
						jQuery.each(optionObj, function(index2,value2) {
							var optionId = value2['id'];
							var optionName = value2['name'];
							var optionImg = value2['image'];
							/*if(parseInt(dataIsFromServer) == 0){
								downloadFile(optionId, optionImg, 'attrOption');
								setTimeout(function() {
				    				//$('#please-wait-modal').modal('hide');
				    			}, 2000);
							}*/
							//var optionImages = window.appRootDir.fullPath + '/' + optionId+'_'+optionImg;
							//var optionImages = localPath + "/" + 'attributes'+ '/' +optionImg; // For Production
							//var optionImages = attributeImageData + '/'+optionImg; // Direct Hitting to server URL
							var optionImages = '';
							if(testingInBrowser){
								optionImages = 'img/attr'+index2+'.png'; // For Testing
							}else{
								optionImages = localPath + "/" + 'attributes'+ '/' +optionImg; // For Production
							}
							//var optionImages = 'img/attr'+index2+'.png'; // For Testing
							//initToCheckTheFile(optionImg, attributeImageData);
							var tempOptDiv = '<div class="col-xs-6 col-sm-3 col-md-2 col-lg-2 single-option attrInd'+attributeForNextIndex+' optMenu-bar attrOpt'+server_attr_id+' div_opt_id'+optionId+'" data-optname="'+optionName+'" data-attrindex="'+attributeForNextIndex+'" style="text-align: center;" onclick="selectedOptionFn(this)" data-opt_id="'+optionId+'" data-cat_id="'+catId+'" data-prod_id="'+prodId+'" data-attrid="'+server_attr_id+'" data-lid="'+attrId+'"><div class="box"><img class="attr-opt-hei-wid" src="'+optionImages+'" data-imgt_cat_id="'+catId+'" data-imgt_prod_id="'+prodId+'" data-imgt_attrid="'+server_attr_id+'"  data-imgt_opt_id="'+optionId+'" data-imgt_lid="'+attrId+'" alt="'+optionName+'"></div></div>';
							optionMainDiv += tempOptDiv;
						});
						 attributeDiv += tempAttrDiv;
						 attributeForNextIndex = parseInt(attributeForNextIndex) + 1;
					}else{
						if(parseInt(dataIsFromServer) == 0){
							jQuery.each(optionObj, function(index2,value2) {
								var optionId = value2['id'];
								var optionName = value2['name'];
								var optionImg = value2['image'];
								downloadFile(optionId, optionImg, 'attrOption');
								setTimeout(function() {
				    				//$('#please-wait-modal').modal('hide');
				    			}, 2000);
							});
						}
					}
				});
			}
			
		});
		getMeasumentListFromLocal();
		if(!attriOptionExist){
			showMeasurementDiv();
		}else{
			if(attributeForNextIndex > 0){
				attributeForNextIndex = parseInt(attributeForNextIndex) - 1;
			}
			$('.selMenu-bar').remove();
			$('.optMenu-bar').remove();
			$('.optionPreNextButton').remove();
			$( attributeDiv ).insertAfter( ".selection-menu .selection-menu-ul .galleryDivTag" );
			$('.galleryTag').hide();
			$('.attributeTag').show();
			//$('.selection-menu').append(attributeDiv);
			$('.attr-option-div').append(optionMainDiv);
			$('.attr-option-div .optMenu-bar').hide();
			$('.attrOpt'+attrTempId).show();
			
			//$('.subMen_attrId'+attrTempId).addClass("active");
			$('.selection-menu').each(function(index){
				$(this).find('ul li').removeClass("active").find('a').removeClass("active");
				$(this).find('ul li.subMen_attrId'+attrTempId).addClass("active").find('a').addClass("active");
			});
			
			var appendButtons = '<div class="row optionPreNextButton" style="margin-top: 25px;"><div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"><button class="back-button btn btn-primary st-bg-baby-pink ui-btn ui-shadow ui-corner-all" disabled="disabled" onclick="backButton('+attributeForNextIndex+')">Previous</button></div>';
			if(parseInt(attributeForNextIndex) > 0){
				appendButtons += '<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6"><button class="btn btn-primary st-bg-baby-pink ui-btn ui-shadow ui-corner-all front-button" onclick="frontButton(1)">Next</button></div>';
			}else{
				appendButtons += '<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 float-right"><button class="btn btn-primary st-bg-baby-pink ui-btn ui-shadow ui-corner-all front-button" disabled="disabled" onclick="showMeasurementDiv()">Next</button></div>';
			}
			appendButtons +='</div>';
			
			
			$('.selection-page-options-div .appendButton').append(appendButtons);
			
			
			gotoAttributePageDiv();
		}
		showGalleryDivTag();
	}
	
	function backButton(index){
		if(index == 0){
			$('.back-button').attr('disabled','disabled');
			//$('.back-button"]').prop('disabled', true);
			//$('.back-button').attr();
		}
		var attrId = $('.main_attr_ind'+index).data('attrid');
		$('.galleryTag').hide();
		$('.attributeTag').show();
		console.log('attrId  : '+attrId);
		$('.attr-option-div .optMenu-bar').hide();
		$('.attrOpt'+attrId).show();
		$('.selection-menu').find('ul li').removeClass("active").find('a').removeClass("active");
		$('.selection-menu').find('ul li.subMen_attrId'+attrId).addClass("active").find('a').addClass("active");
		if(parseInt(index) == parseInt(attributeForNextIndex)){
			$('.front-button').attr('onclick', 'showMeasurementDiv()');
			//$('.front-button').attr('disabled','disabled');
		}else{
			var appendFrontIndex = parseInt(index)+1;
			$('.front-button').attr('onclick', 'frontButton("'+appendFrontIndex+'")');
		}
	}
	
	function frontButton(index){
		$('.galleryTag').hide();
		$('.attributeTag').show();
		$('.back-button').removeAttr('disabled');
		if(parseInt(index) <= parseInt(attributeForNextIndex)){
			var attrId = $('.main_attr_ind'+index).data('attrid');
			console.log('attrId  : '+attrId);
			$('.attr-option-div .optMenu-bar').hide();
			$('.attrOpt'+attrId).show();
			$('.selection-menu').find('ul li').removeClass("active").find('a').removeClass("active");
			$('.selection-menu').find('ul li.subMen_attrId'+attrId).addClass("active").find('a').addClass("active");
			var appendBackIndex = parseInt(index) - 1;
			$('.back-button').attr('onclick', 'backButton("'+appendBackIndex+'")');
			if(parseInt(index) == parseInt(attributeForNextIndex)){
				$('.front-button').attr('onclick', 'showMeasurementDiv()');
				//$('.front-button').attr('disabled','disabled');
			}else{
				var appendFrontIndex = parseInt(index)+1;
				$('.front-button').attr('onclick', 'frontButton("'+appendFrontIndex+'")');
			}
		}else{
			showMeasurementDiv();
		}
	}
	
	var optionArrayToSave = [];
	var attributeArrayToSave = [];
	var optionImageName = [];
	function selectedOptionFn(thisData){
		$('.galleryTag').hide();
		$('.attributeTag').show();
		var attrId = $(thisData).data('attrid');
		var optName = $(thisData).data('optname');
		$('.subMen_attrId'+attrId).addClass('option-selected');
		$('.selection-page-options-div .attr-option-div .attrOpt'+attrId).removeClass('active');
		$(thisData).addClass("active");
		
		var optId = $(thisData).data('opt_id');
		
		var indexOfAttr = jQuery.inArray(attrId, attributeArrayToSave );
		if(indexOfAttr >= 0){
			var tempAttrArray = [];
			var tempOptionArray = [];
			var tempOptionName = [];
			for(var i = 0 ;i <=attributeArrayToSave.length; i++){
				if(attrId != attributeArrayToSave[i]){
					tempAttrArray.push(attributeArrayToSave[i]);
					tempOptionArray.push(optionArrayToSave[i]);
					tempOptionName.push(optionImageName[i]);
				}
			}
			optionArrayToSave = tempOptionArray;
			attributeArrayToSave = tempAttrArray;
		}
		//if ($( "#customerConfirmationPageId .customerFieldsToAppendSelected .attrOpt"+attrId ).length > 0 ){
	       // alert('Found with Length '+$( ".div_opt_id"+optId ).length);
	        $('.customerFieldsToAppendSelected .attrOpt'+attrId).remove();
	    //}else{
	    	$( ".div_opt_id"+optId ).clone().appendTo( "#customerConfirmationPageId .hrClassForOptions" );
	   // }
	    	optionArrayToSave.push(optId);
	    	attributeArrayToSave.push(attrId);
	    	optionImageName.push(optName);
		$("#customerConfirmationPageId .customerFieldsToAppendSelected .optMenu-bar").show();
		
		var $attrIndex = $(thisData).data('attrindex');
		console.log('$attrIndex ' +$attrIndex);
		
		
		
		/*if(parseInt($attrIndex) < parseInt(attributeForNextIndex)){
			$('.back-button').removeAttr('disabled');
			$('.back-button').attr('onclick', 'backButton("'+$attrIndex+'")');
			$attrIndex = $attrIndex + 1;
			console.log('$attrIndex + 1 : '+$attrIndex);
			var attrId = $('.attrInd'+$attrIndex).data('attrid');
			console.log('attrId  : '+attrId);
			$('.attr-option-div .optMenu-bar').hide();
			$('.attrOpt'+attrId).show();
			$('.selection-menu').find('ul li').removeClass("active").find('a').removeClass("active");
			$('.selection-menu').find('ul li.subMen_attrId'+attrId).addClass("active").find('a').addClass("active");
			
			if(parseInt($attrIndex) == parseInt(attributeForNextIndex)){
				$('.front-button').attr('onclick', 'showMeasurementDiv()');
			}else{
				var appendFrontIndex = parseInt($attrIndex)+1;
				$('.front-button').attr('onclick', 'frontButton("'+appendFrontIndex+'")');
			}
			
		}else{
			showMeasurementDiv();
		}*/
		
	}

	var measurementsData;
	function getMeasurementsDataFromServer(){
		var dataToSend = {};
		dataToSend["secret_key"] = tailorDetailsSession.secret_key;
		var apiCallUrl="http://tailorapp.tailorrani.com/api/measurements/measurementsJson"
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
		var responseJson = $.parseJSON(JSON.stringify(data));
		measurementJsonData = responseJson["result"];
		// FIXME CHECK JSON DATA
		db.transaction(insertMeasurementsDetails, errorCBInsertMeasurementDetails, successCBInsertMeasurementDetails);
	}
	
	function successCBInsertMeasurementDetails() {
		getCategoriesListFromLocal();
	}	
	function errorCBInsertMeasurementDetails(err) {
		console.log("errorCBInsertMeasurementDetails");
	}
	
	function appendMeasurementDataInDiv(measurementArrData){
		$('#measurementPageId').find('.measurement-input-fields-div').empty();
		var appendMeasurementData = '<table> <tbody>';
		var i = 0;
		jQuery.each(measurementArrData, function(index,value) {
			var groupJsonDataCheck = dataTypeCheckJSON(value['group_data']);
			
		//	alert("groupJsonDataCheck -- "+groupJsonDataCheck);
			
			if(value['group_data'] != '' && groupJsonDataCheck != 'other'){
				
				var groupJsonData = jQuery.parseJSON(value['group_data']);
				jQuery.each(groupJsonData, function(groupIndex,groupValue) {
					var groupMeasurementTypeId = groupValue['measurement_type_id'];
					if(groupMeasurementTypeId == measurementTypeId){
						var groupName = groupValue['name'];
						if(groupValue['measurements'] != ''){
							var measurementGroupData = groupValue['measurements'];
							//var groupLabelName = '<div class="col-sm-12">Col12</div><div class="col-sm-6">col6</div><div class="col-sm-6">col6</div>';
							var groupLabelName = '<tr><th colspan=2 class="h3Measure measurements-group-heading-div">'+groupName+'</th></tr>';
							//var groupLabelName = '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 h3Measure measurements-group-heading-div">' + groupName + '</div>';
							appendMeasurementData += groupLabelName;
							//var measurementGroupJsonData = jQuery.parseJSON(measurementGroupData);
							jQuery.each(measurementGroupData, function(measurementsIndex,measurementsValue) {
								var measNameForField  = measurementsValue['name'];
								var measPriKeyForField = measurementsValue['id'];
								var groupFieldsName = '<tr><td class="measure-inputField">'+measNameForField+'</td>'
									+'<td class="measure-inputField">';
								console.log(measurementTypeDiv);
								if(parseInt(measurementTypeDiv) != 0){
									console.log(measurementTypeDiv);
									groupFieldsName += '<div class="ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset">';
								}
								groupFieldsName +='<input type="number" class="form-control meas-ind'+i+'" data-meas_name="'+measNameForField+'" data-meas_pkid="'+measPriKeyForField+'" id="measField'+measPriKeyForField+'"'+'name="measField'+measPriKeyForField+'">';
								if(parseInt(measurementTypeDiv) != 0){
									groupFieldsName += '</div>';
								}
								groupFieldsName += '</td></tr>';
								/*var fieldsDiv = '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 measure-inputField"> <div class="box start-xs start-sm start-md start-lg"> '
									+measNameForField+' <input type="text" class="form-control meas-ind'+i+'" data-meas_name="'+measNameForField+'" data-meas_pkid="'+measPriKeyForField+'" id="measField'+measPriKeyForField+'"'+'name="measField'+measPriKeyForField+'"> </div></div>';*/
								appendMeasurementData += groupFieldsName;
								i = parseInt(i)+1;
							});
						}
					}
				});
			}
			//}
		});
		
		if(parseInt(measurementTypeDiv) != 0){
			appendMeasurementData += '<tr><td colspan="2"><button type="button" name="bookOrder" id="bookOrder" onclick="orderTakeMeastFn()" class="btn btn-primary st-bg-baby-pink ui-btn ui-shadow ui-corner-all"> Book Order </button></td></tr></tbody></table>';
		}else{
			appendMeasurementData += '<tr><td colspan="2"><button type="button" name="bookOrder" id="bookOrder" onclick="orderTakeMeastFn()" class="btn btn-primary st-bg-baby-pink"> Book Order </button></td></tr></tbody></table>';
		}
			measurementTypeDiv++;
		//$('#measurementPageId').find('.measurement-input-fields-div').empty();
		$('#measurementPageId').find('.measurement-input-fields-div').append(appendMeasurementData);
		//$('#measurementPageId').find('.h3Measure').remove();
		//$('#measurementPageId').find('.measureHr').remove();
		//$( appendMeasurementData ).insertBefore( "#measurementPageId .orderSubmitButton" );
		//$('#measurementPageId').find('.measurement-InputFields').append(appendMeasurementData);
	}
	
	
	// Tailor Details
	var measurementsData;
	function getTailorDetailsDataFromServer(){
		var dataToSend = {};
		dataToSend["secret_key"] = loginUserId;
		var apiCallUrl="http://tailorapp.tailorrani.com/api/tailors/tailorinfoJson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallPost,
				url: apiCallUrl,
				data : dataToSend,
				success: successCBTailorDetailsFn,
				error: commonErrorCallback
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}

	function successCBTailorDetailsFn(data){
		console.log(data);
		var responseJson = $.parseJSON(JSON.stringify(data));
		
		tailorDetailsJsonData = responseJson["result"];
		//alert('dataparse : '+$.parseJSON(tailorDetailsJsonData));
		//alert('tailorDetailsJsonData : '+tailorDetailsJsonData);
		// FIXME CHECK JSON DATA
		db.transaction(insertTailorDetailsDetails, errorCBInsertTailorDetailsDetails, successCBInsertTailorDetailsDetails);
	}
	
	function successCBInsertTailorDetailsDetails() {
		getTailorDetailsFromLocal();
	}	
	function errorCBInsertTailorDetailsDetails(err) {
		console.log("errorCBInsertTailorDetailsDetails : "+err.message);
	}
	
/*  ------------------- Module-wise Methods/Function Code Starts ------------------  */	

/*  ------------------- Other Methods/Function like Click, Load, etc. Starts ------------------  */		
	
	function menuCategoryOne(object){
		$(".main-menu ul li a").removeClass('active');
		$(object).find('a').addClass('active');
		$('.childSubMenuClass').removeClass('active');
		var subMenuId = $(object).data('submenuid');
		$('#mainPageId').find('.sub-menu').hide();
		$("."+subMenuId).show();
		$('#mainPageId .product-list').find('.galleriesClass').hide();
		//mainGalleryFn(object);
	}
	
	function getOptionByAttrId(dataObj){
		$('.galleryTag').hide();
		$('.attributeTag').show();
		var attrTempId = $(dataObj).data('attri_id');
		/*
		$('.selection-menu').each(function(index){
			$('ul li').removeClass("active");
			$('ul li a').removeClass("active");
			
			$('ul li.subMen_attrId'+attrTempId).addClass("active");
			$('ul li.subMen_attrId'+attrTempId + ' a').addClass("active");
		});
		*/
		var attrTempIndexId = $(dataObj).data('main_attinda');
		//alert(attrTempIndexId);
		if(parseInt(attrTempIndexId) == 0){
			$('.back-button').attr('disabled','disabled');
			$('.back-button').attr('onclick', 'backButton("'+attrTempIndexId+'")');
		}else if(parseInt(attrTempIndexId) > 0){
			var appendBackIndex = parseInt(attrTempIndexId) - 1;
			$('.back-button').attr('onclick', 'backButton("'+appendBackIndex+'")');
			$('.back-button').removeAttr('disabled');
		}
		
		if(parseInt(attrTempIndexId) == parseInt(attributeForNextIndex)){
			$('.front-button').attr('onclick', 'showMeasurementDiv()');
		}else{
			var appendFrontIndex = parseInt(attrTempIndexId)+1;
			$('.front-button').attr('onclick', 'frontButton("'+appendFrontIndex+'")');
		}
		
		$('.selection-menu').each(function(index){
			$(this).find('ul li').removeClass("active").find('a').removeClass("active");
			$(this).find('ul li.subMen_attrId'+attrTempId).addClass("active").find('a').addClass("active");
		});
		
		
		$('.selection-page-options-div .attr-option-div .optMenu-bar').hide();
		$('.attrOpt'+attrTempId).show();
		gotoAttributePageDiv();
	}
	
	function mainGalleryFn(object){
		$(".sub-menu ul li a").removeClass('active');
		$(object).find('a').addClass('active');
		
		var cat_id = $(object).data('cat_id');
		$('.galleriesClass').hide();
		$(".gallcatid"+cat_id).show();
	}
	
	function attrMenu(object){
		var attrFindObj = $(object).data('attrIndex');
		$('.optMenu-bar').hide();
		$('.'+attrFindObj).show();
	}
	
	function showMeasurementDiv(){
		$('.selection-menu').each(function(index){
			$(this).find('ul li').removeClass("active").find('a').removeClass("active");
			$(this).find('ul li.measurementDivShow').addClass("active").find('a').addClass("active");
		});
		$('.galleryTag').hide();
		$('.attributeTag').show();
		gotoMeasurementPageDiv();
	}
	
	function showGalleryDivTag(){
		$('.selection-menu').each(function(index){
			$(this).find('ul li').removeClass("active").find('a').removeClass("active");
			$(this).find('ul li.galleryDivTag').addClass("active").find('a').addClass("active");
		});
		$('.galleryTag').show();
		$('.attributeTag').hide();
	}
	
	function dataTypeCheckJSON(someobj) {
		var dataType="";
		try {
			if (typeof someobj != 'string'){
				if(a.constructor.name === 'Array'){
					dataType="Array";
				}
				else if(a.constructor.name === 'Object'){
					dataType="Object";
				}
			}else if (typeof someobj == 'string'){
				dataType="string";
			}else{
				dataType="other";
			}
		} catch (e) {
			dataType="other";
		}
		return dataType;
	}
	
	var orderTakenDetails = new Array();
	var selectedOptionMainArray = new Array();
	var selectedOptionMain = new Object();
	function orderTakeMeastFn(){
		var lengthOfOrder = $( "#measurementPageId .measure-inputField" ).length;
		if(optionArrayToSave.length > 0 && attributeArrayToSave.length > 0 && optionImageName.length > 0){
			var arrObject = new Array();
			for(var i = 0; i< optionArrayToSave.length; i++){
				var childObject = new Object();
				var optionId = optionArrayToSave[i];
				var attrId = attributeArrayToSave[i];
				var optName = optionImageName[i];
				childObject.optionId = optionId;
				childObject.attrId = attrId;
				childObject.optName = optName;
				arrObject.push(childObject);
			}
			selectedOptionMainArray = arrObject;
			selectedOptionMain.optionArray = selectedOptionMainArray;
			selectedOptionMain.product_id = $('#prodHtmlId').val();
			selectedOptionMain.product_name = $('#prodHtmlName').val();
			selectedOptionMain.gallery_id = galleryIdToSave;
			selectedOptionMain.gallery_name = galleryNameToSave;
			console.log('selectedOptionMain : '+selectedOptionMain)
		}
			 
		if(lengthOfOrder > 0){
			var arrObject= new Array();
			for(var i = 0; i<lengthOfOrder; i++){
				var childObject = new Object();
				var measPKId = $('.meas-ind'+i).data('meas_pkid');
				var measName = $('.meas-ind'+i).data('meas_name');
				var inputValue = $('#measField'+measPKId).val();
				if(measPKId != undefined  && measPKId != 'undefined'){
					childObject.measPKId = measPKId;
					childObject.measName = measName;
					childObject.inputValue = inputValue;
					arrObject.push(childObject);
				}
			}
			orderTakenDetails = arrObject;
		}
		//insertOrderDetails(arrObject);
		appendOrderMeasurementDetails(orderTakenDetails);
		gotoCustomerPageDiv();
	}
	
	function appendOrderMeasurementDetails(array){
		$('.appendMeasuOrderList').empty();
		var tableMainRow = '';
		var i = 0;
		jQuery.each(array, function(index,value) {
			var tableChildRowStart = '<tr class="insertedMeasList">'
			var tableChildRowEnd = '';
			if(parseInt(index) % 2 == 0){
				tableChildRowStart += '<td> '+value.measName+' </td><td>  '+value.inputValue+' </td>';
				tableMainRow += tableChildRowStart;
			}else{
				tableChildRowEnd += '<td> '+value.measName+' </td><td>  '+value.inputValue+' </td><tr>';
				tableMainRow += tableChildRowEnd;
			}
			i = parseInt(i)+1;
		});
		if(i % 2 != 0){
			var tableChildRowEnd = '<td> &nbsp; </td><td> &nbsp; </td><tr>';
			tableMainRow += tableChildRowEnd;
		}
		$('.appendMeasuOrderList').append(tableMainRow);
	}
	
	function appendOrderAndCustomerDetails(orderArrData, customerArrData){
		/*$('#prodHtmlName').val('');
		$('#prodHtmlId').val('');
		$('#categoryHtmlId').val('');
		$('#customerIdInput').val('');
		$('#newOrderId').val('');
		$('#customerNameInput').val('');
		$('#priceInput').val('');
		$('#contactNumberInput').val('');
		$('#addressInput').val('');*/
		$('#orderReportPageId').find('table tbody').empty();
		var tableRowMain = '';
		if(orderArrData != ''){
			jQuery.each(orderArrData, function(index,value) {
				var order_id = value['id'];
				var server_cat_id = value['server_cat_id'];
				var server_prod_id = value['server_prod_id'];
				var order_data = value['order_data'];
				var server_prod_name = value['server_prod_name'];
				var update_timestamp = value['update_timestamp'];
				var status_of_order = value['status_of_order'];
				var customer_id = value['customer_id'];
				var arr = update_timestamp.split('_');
				var tableRow = '';
				tableRow += '<tr><td>'+order_id+'</td>';
				var customerExist = false;
				jQuery.each(customerArrData, function(indexObj,valueObj) {
					if(parseInt(customer_id) == parseInt(valueObj['id'])){
						var customerName = valueObj['name'];
						var contactNumber = valueObj['contact_number'];
						tableRow += '<td>'+customerName+'</td>';
						tableRow += '<td>'+contactNumber+'</td>';
						customerExist = true;
					}
				});
				if(!customerExist){
					tableRow += '<td> &nbsp;</td>';
					tableRow += '<td> &nbsp;</td>';
				}
				tableRow += '<td> '+server_prod_name+' </td>';
				tableRow += '<td> '+arr[0]+' </td>';
				tableRow += '<td> '+status_of_order+' </td>';
				/*tableRow += '<td> Edit </td></tr>';*/
				tableRowMain += tableRow;
			});
			
		}else{
			tableRowMain += '<tr><td colspan="6">No data found.</td></tr>'
		}
		$('#orderReportPageId').find('table tbody').append(tableRowMain);
		/*connectionType=checkConnection();
		if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 5G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			if(((typeof $('#customerNameInput').val() != 'undefined') && $('#customerNameInput').val() != '') && ($('#newOrderId').val() != '' && (typeof $('#newOrderId').val() != 'undefined'))){
				gotoOrderPageDiv();
				sendCustomerDetailsToSaveInServer();
			}else{
				console.log('Came to if else block');
			}
		}*/
		gotoOrderPageDiv();
		
	}
	
	// Send Data to Server
	function sendCustomerDetailsToSaveInServer(){
		var dataToSend = {};
		dataToSend["secret_key"] = tailorDetailsObj.secret_key;
		dataToSend["name"] = $('customerNameInput').val();
		dataToSend["tailor_id"] = tailorDetailsObj.tailor_details_id;
		dataToSend["customer_id"] = $('#customerIdInput').val();
		dataToSend["contact"] = $('#contactNumberInput').val();
		dataToSend["email"] = $('#emailIdInput').val();
		dataToSend["status"] = 1;
		
		var appurltemps="http://tailorapp.tailorrani.com/api/customers/storejson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallType,
				url: appurltemps,
				data : dataToSend,
				success: successCBCustomerDetailsFn,
				error: commonErrorCallback
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}
	
	function successCBCustomerDetailsFn(){
		console.log('successCBCustomerDetailsFn');
		sendOrderDetailsToSaveInServer();
	}
	
	function sendCustomerDetailsToUpdateInServer(){
		var dataToSend = {};
		
		dataToSend["secret_key"] = tailorDetailsObj.secret_key;
    	dataToSend["id"] = 0;
		dataToSend["name"] = $('customerNameInput').val();
		dataToSend["tailor_id"] = tailorDetailsObj.tailor_details_id;
		dataToSend["customer_id"] = $('#customerIdInput').val();
		dataToSend["contact"] = "";
		dataToSend["email"] = "";
		dataToSend["status"] = 0;
		
		var appurltemps="http://tailorapp.tailorrani.com/api/customers/updateJson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallType,
				url: appurltemps,
				data : dataToSend,
				success: successCBCustomerDetailsFn,
				error: commonErrorCallback
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}
	
	function sendOrderDetailsToSaveInServer(){
		var dataToSend = {};
		
		dataToSend["secret_key"] = tailorDetailsObj.secret_key;
		dataToSend["tailor_id"] = tailorDetailsObj.tailor_details_id;
		dataToSend["customer_id"] = $('#customerIdInput').val();
		dataToSend["order_id"] = $('#newOrderId').val();
		dataToSend["order_price"] = $('#priceInput').val();
		dataToSend["status"] = 1;
		dataToSend["order_attributes"] = selectedOptionMain;
		dataToSend["order_measurements"] = orderTakenDetails;
		var appurltemps="http://tailorapp.tailorrani.com/api/orders/storejson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallType,
				url: appurltemps,
				data : dataToSend,
				success: successCBOrderDetailsFn,
				error: commonErrorCallback
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}
	
	function successCBOrderDetailsFn(){
		console.log('successCBOrderDetailsFn');
		$('#prodHtmlName').val('');
		$('#prodHtmlId').val('');
		$('#categoryHtmlId').val('');
		$('#customerIdInput').val('');
		$('#newOrderId').val('');
		$('#customerNameInput').val('');
		$('#priceInput').val('');
		$('#contactNumberInput').val('');
		$('#addressInput').val('');
		gotoOrderPageDiv();
	}
	
	function sendOrderDetailsToUpdateInServer(){
		var dataToSend = {};
    	
    	dataToSend["secret_key"] = tailorDetailsObj.secret_key;
    	dataToSend["id"] = 0;
		dataToSend["tailor_id"] = tailorDetailsObj.tailor_details_id;
		dataToSend["customer_id"] = $('#customerIdInput').val();
		dataToSend["order_id"] = $('#newOrderId').val();
		dataToSend["order_price"] = $('#priceInput').val();
		dataToSend["status"] = 1;
		dataToSend["order_attributes"] = selectedOptionMain;
		dataToSend["order_measurements"] = orderTakenDetails;
		
		var appurltemps="http://tailorapp.tailorrani.com/api/orders/updateJson"
		connectionType=checkConnection();
		if(connectionType=="Unknown connection" || connectionType=="No network connection"){
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
		else if(connectionType=="WiFi connection" || connectionType=="Cell 4G connection" || connectionType=="Cell 3G connection" || connectionType=="Cell 2G connection"){
			$.ajax({
				type : ajaxCallType,
				url: appurltemps,
				data : dataToSend,
				success: successCBOrderDetailsFn,
				error: commonErrorCallback
			});
		}
		else{
			navigator.notification.alert(appRequiresWiFi,alertConfirm,appName,'Ok');
		}
	}	
	
	// To save File Function
	function gotFS(fileSystem) {
		store = cordova.file.dataDirectory;
		console.log('store location : '+ store + 'ApplicationDirectory : '+cordova.file.applicationDirectory);
		window.appRootDirName = "tailorrani";
		onRequestFileSystemSuccess(fileSystem);
	    // save the file system for later access
	    console.log(fileSystem.root.fullPath);
	    window.fileSystem = fileSystem;
	    window.rootFS = fileSystem.root;
	    console.log('window.rootFS : '+window.rootFS);
	    fileSystem.root.getDirectory(window.appRootDirName, {
            create: true,
            exclusive: false
        }, dirReady, fail);
	}
	
	function onRequestFileSystemSuccess(fileSystem) { 
        var entry=fileSystem.root; 
        entry.getDirectory("tailorrani", {create: true, exclusive: false}, onGetDirectorySuccess, onGetDirectoryFail); 
	} 
	
	function onGetDirectorySuccess(dir) { 
	      console.log("Created dir "+dir.name); 
	} 

	function onGetDirectoryFail(error) { 
	     console.log("Error creating directory "+error.code); 
	} 
	
	function dirReady(entry) {
        window.appRootDir = entry;
        console.log('window.appRootDir'+window.appRootDir);
        console.log('window.appRootDir FullPath'+window.appRootDir.fullPath);
        console.log("application dir is ready");
    }
	// Kishore Commented
	
	//window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem; // Kishore Added
    //window.requestFileSystem(LocalFileSystem.TEMPORARY, 0, gotFS, fail); // Kishore Added
	
	function downloadFile(imageId, imageName, imageType) {
        var url = '';
        if(imageType == 'product'){
        	url = productImageData + '/' + imageName;
        }else if(imageType == 'attrOption'){
        	url = attributeImageData + '/'+ imageName;
        }
        var filePath = '';
        if(imageType == 'product'){
        	filePath = '/' + imageId +'_'+ imageName;
        }else if(imageType == 'attrOption'){
        	filePath = '/' + imageId +'_' + imageName;
        }
        
        var filepathToStore='file:///storage/sdcard0/'+ 'tailorrani/' + filePath;
        filetransferFn(url,filepathToStore);
    }
	
	function downloadFileTestFn(type) {
		var File_Name='product_5_582ea8c053c3b.jpg';
		var URL='http://tailorapp.tailorrani.com/images\/Products\/product_image' + '/' + File_Name;
		var Folder_Name="galleryTest";
		downloadFileValidatorFn(URL, Folder_Name, File_Name, type);
	}
	
	//First step check parameters mismatch and checking network connection if available call    download function
	function downloadFileValidatorFn(URL, Folder_Name, File_Name, type) {
		//Parameters mismatch check
		if (URL == null && Folder_Name == null && File_Name == null) {
			return;
		}
		else {
			//checking Internet connection availablity
			if(connectionType=="Unknown connection" || connectionType=="No network connection"){
				return;
			}
			else {
				downloadFileFn(URL, Folder_Name, File_Name, type); //If available download function call
			}
		}
	}
	var folderPath = '';
	var folderAndPath;
	var downloadLinkGlobalTest;
	// 2nd Step 
	function downloadFileFn(URL, Folder_Name, File_Name, count) {
		//step to request a file system 
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);

		function fileSystemSuccess(fileSystem) {
			var download_link = encodeURI(URL);
			ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL
			downloadLinkGlobalTest = download_link;
			var rootdir11 = fileSystem.root;
			
			var directoryEntry = fileSystem.root; // to get root path of directory
			directoryEntry.getDirectory(Folder_Name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
			
			store = cordova.file.dataDirectory;
			
			//var fp = rootdir.fullPath; // Returns Fulpath of local directory
			folderAndPath = Folder_Name + '/' + File_Name;
			var fileDataDirect = store + "/" + folderAndPath; // fullpath and name of the file which we want to give
			// download function call
			filetransferFn(download_link, fileDataDirect);
		}

		function onDirectorySuccess(parent) {
			// Directory created successfuly
			console.log("onDirectorySuccess");
		}

		function onDirectoryFail(error) {
			//Error while creating directory
			console.log("Unable to create new directory: " + error.code);
		}

		function fileSystemFail(evt) {
			//Unable to access file system
			console.log(evt.target.error.code);
		}
	}
	
	// 3rd Step 
	function filetransferFn(download_link, fp) {
		var fileTransfer = new FileTransfer();
		//console.log(fp);
		// File download function with URL and local path
		fileTransfer.download(download_link, fp,
				function (entry) {
			//localPath = entry.toURI();
			console.log("download toURI: " + entry.toURI());
			window.resolveLocalFileSystemURL(entry.toURI(), fileExist, fileNotExist);
			//checkIfFileExists(entry.toURI());
			//count = parseInt(count)+1;
		},
		function (error) {
			//Download abort errors or download failed errors
			console.log("download error source " + error.source);
			//alert("download error target " + error.target);
			//alert("upload error code" + error.code);
		}
		);
	}
	
	function fileNotExist(e) {
	    console.log("File not exist");
	    console.dir(e);
	}
	
	function fileExist(fileEntry) {
		console.log('File Exist');
	}
	

	
	
	