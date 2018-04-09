window.onload = function(){
	// Buttons
	var quickAddBtn = document.getElementById('QuickAdd');
	var quickAddOrgBtn = document.getElementById('QuickAddOrg');
	var cancelBtn = document.getElementById('Cancel');
	var cancelOrgBtn = document.getElementById('CancelOrg');
	var AddBtn = document.getElementById('Add');
	var AddOrgBtn = document.getElementById('AddOrg');
	var UpdateBtn = document.getElementById('Update');
	var UpdateOrgBtn = document.getElementById('UpdateOrg');
	// People Form Fields
	var fullname = document.getElementById('fullname');
	var organisation = document.getElementById('org');
	var phone = document.getElementById('phone');
	var address = document.getElementById('address');
	var postcode = document.getElementById('postcode');
	var email = document.getElementById('email');
	// Organisation Form Fields
	var orgName = document.getElementById('orgname');
	var orgPhone = document.getElementById('orgphone');
	var orgAddress = document.getElementById('orgaddress');
	var orgPostcode = document.getElementById('orgpostcode');
	var orgEmail = document.getElementById('orgemail');
	// Divs etc.
	var quickAddFormDiv = document.querySelector('.quickaddForm');
	var quickAddOrgFormDiv = document.querySelector('.quickaddorgForm');
	var addressBookDiv = document.querySelector('.peoplebook');
	var orgBookDiv = document.querySelector('.orgbook');
	var viewEmployeesDiv = document.querySelector('.viewEmployees');

	quickAddBtn.addEventListener("click", function(){
		// display the form div
		quickAddOrgFormDiv.style.display = "none";
		quickAddFormDiv.style.display = "block";
		AddBtn.style.display = "inline";
		UpdateBtn.style.display = "none";
	});

	quickAddOrgBtn.addEventListener("click", function(){
		// display the form div
		quickAddFormDiv.style.display = "none";
		quickAddOrgFormDiv.style.display = "block";
		AddOrgBtn.style.display = "inline";
		UpdateOrgBtn.style.display = "none";
	});

	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
	});
	cancelOrgBtn.addEventListener("click", function(){
		quickAddOrgFormDiv.style.display = "none";
	});
	AddBtn.addEventListener("click", function(){
		addToBook(false);
	});
	AddOrgBtn.addEventListener("click", function(){
		addToOrgBook(false);
	});
	UpdateBtn.addEventListener("click", function(){
		addToBook(true);
	});
	UpdateOrgBtn.addEventListener("click", function(){
		addToOrgBook(true);
	});
	addressBookDiv.addEventListener("click", deletedUpdateView);
	orgBookDiv.addEventListener("click", deletedUpdateView);
	viewEmployeesDiv.addEventListener("click", deletedUpdateView);

	// Storage and temp params;
	var addressBook = [];
	var orgBook = [];
	var toBeUpdated = "";
	var orgToBeUpdated = "";

	//localStorage['addressBook'] = '[{"fullname":"Sachin B","email":"sachin@frameboxx.in","phone":"93828292","address":"something","postcode":"Chandigarh"}]';
	function setupStorage(){
		if(localStorage['addressBook'] === undefined){
			localStorage['addressBook'] = '';
		}
		if(localStorage['orgBook'] === undefined){
			localStorage['orgBook'] = '';
		}
	}

	function jsonStructure(fullname,org,phone,address,postcode,email){
		this.fullname = fullname;
		this.organisation = org;
		this.phone = phone;
		this.address = address;
		this.postcode = postcode;
		this.email = email;
	}

	function orgJsonStructure(name,phone,address,postcode,email) {
		this.orgName = name;
		this.orgPhone = phone;
		this.orgAddress = address;
		this.orgPostcode = postcode;
		this.orgEmail = email;
	}

	function addToBook(update){
		var isNotNull = fullname.value!='' && organisation.value!='' && phone.value!='' && address.value!='' && postcode.value!='' && email.value!='';
		if(isNotNull){
			// check if organisation entered exists
			// if not, ask whether they would like to create it
			orgBook = JSON.parse(localStorage['orgBook']);
			var exists = false;
			for (var x in orgBook) {
				if (orgBook[x].orgName == organisation.value) {
					exists = true;
					break;
				}
			}
			if (exists) {
				if (update) {
					var index = addressBook.indexOf(toBeUpdated);
					if (index !== -1){
						addressBook.splice(index,1);
					}
				}
				// format the input into a valid JSON structure
				var obj = new jsonStructure(fullname.value,organisation.value,phone.value,address.value,postcode.value,email.value);
				addressBook.push(obj);
				localStorage['addressBook'] = JSON.stringify(addressBook);
				quickAddFormDiv.style.display = "none";
				clearForm(true);
				showAddressBook();
			} else {
				window.alert("Organisation does not exist in the database. Please ammend the field or add a new organisation.")
			}
		} else {
			window.alert("Please fill in all fields")
		}
	}

	function addToOrgBook(update){
		var isNotNull = orgName.value!='' && orgPhone.value!='' && orgAddress.value!='' && orgPostcode.value!='' && orgEmail.value!='';
		if(isNotNull){
			if (update) {
				var index = orgBook.indexOf(orgToBeUpdated);
				if (index !== -1){
					orgBook.splice(index,1);
				}
			}
			// format the input into a valid JSON structure
			var obj = new orgJsonStructure(orgName.value,orgPhone.value,orgAddress.value,orgPostcode.value,orgEmail.value);
			orgBook.push(obj);
			localStorage['orgBook'] = JSON.stringify(orgBook);
			quickAddOrgFormDiv.style.display = "none";
			clearForm(false);
			showOrgBook();
		} else {
			window.alert("Please fill in all fields.")
		}
	}

	function deletedUpdateView(e){
		// Remove an entry from the addressbook
		var remID = e.target.getAttribute('data-id');
		if (e.target.classList.contains('delbutton')){
			addressBook.splice(remID,1);
			localStorage['addressBook'] = JSON.stringify(addressBook);
			showAddressBook();
		} else if (e.target.classList.contains('orgdelbutton')){
			orgBook.splice(remID,1);
			localStorage['orgBook'] = JSON.stringify(orgBook);
			showOrgBook();
		} else if (e.target.classList.contains('updatebutton')){
			quickAddOrgFormDiv.style.display = "none";
			quickAddFormDiv.style.display = "block";
			var person = addressBook[remID];
			toBeUpdated = person;
			var i=0;
			for (var key in person) {
    		if (person.hasOwnProperty(key)) {
        	document.getElementsByClassName('formFields')[i].value = person[key];
					i++;
    		}
			}
			AddBtn.style.display = "none";
			UpdateBtn.style.display = "inline";
		} else if (e.target.classList.contains('orgupdatebutton')){
			quickAddOrgFormDiv.style.display = "block";
			quickAddFormDiv.style.display = "none";
			var org = orgBook[remID];
			orgToBeUpdated = org;
			var i=0;
			for (var key in org) {
				if (org.hasOwnProperty(key)) {
					document.getElementsByClassName('orgformFields')[i].value = org[key];
					i++;
				}
			}
			AddOrgBtn.style.display = "none";
			UpdateOrgBtn.style.display = "inline";
		} else if (e.target.classList.contains('orgviewbutton')){
			showOrgPeople(orgBook[remID].orgName);
		} else if (e.target.classList.contains('backbutton')){
			showOrgBook();
		}
	}

	function clearForm(peopleForm){
		if (peopleForm){
			var formFields = document.querySelectorAll('.formFields');
		} else {
			var formFields = document.querySelectorAll('.orgformFields');
		}
		for(var i in formFields){
			formFields[i].value = '';
		}
	}

	function showAddressBook(){
		addressBook = JSON.parse(localStorage['addressBook']);
		// Loop over the array addressBook and insert into the page
		addressBookDiv.innerHTML = '';
		for(var n in addressBook){
			var peoplestr = '<div class="entry">';
			peoplestr += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
			peoplestr += '<div class="org"><p>' + addressBook[n].organisation + '</p></div>';
			peoplestr += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
			peoplestr += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
			peoplestr += '<div class="address"><p>' + addressBook[n].address + '</p></div>';
			peoplestr += '<div class="postcode"><p>' + addressBook[n].postcode + '</p></div>';
			peoplestr += '<div class="update"><a href="#" class="updatebutton" data-id="' + n + '">Update</a></div>';
			peoplestr += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
			peoplestr += '</div>';
			addressBookDiv.innerHTML += peoplestr;
		}
		UpdateBtn.style.display = "none";
	}

	function showOrgBook(){
		orgBook = JSON.parse(localStorage['orgBook']);
		// Loop over the array addressBook and insert into the page
		orgBookDiv.innerHTML = '';
		for(var n in orgBook){
			var orgstr = '<div class="entry">';
			orgstr += '<div class="orgname"><p>' + orgBook[n].orgName + '</p></div>';
			orgstr += '<div class="orgphone"><p>' + orgBook[n].orgPhone + '</p></div>';
			orgstr += '<div class="orgaddress"><p>' + orgBook[n].orgAddress + '</p></div>';
			orgstr += '<div class="orgpostcode"><p>' + orgBook[n].orgPostcode + '</p></div>';
			orgstr += '<div class="orgemail"><p>' + orgBook[n].orgEmail + '</p></div>';
			orgstr += '<div class="orgview"><a href="#" class="orgviewbutton" data-id="' + n + '">View</a></div>';
			orgstr += '<div class="orgupdate"><a href="#" class="orgupdatebutton" data-id="' + n + '">Update</a></div>';
			orgstr += '<div class="orgdel"><a href="#" class="orgdelbutton" data-id="' + n + '">Delete</a></div>';
			orgstr += '</div>';
			orgBookDiv.innerHTML += orgstr;
		}
		viewEmployeesDiv.style.display = "none";
		orgBookDiv.style.display = "block";
		UpdateOrgBtn.style.display = "none";
	}

	function showOrgPeople(orgName){
		orgBookDiv.style.display = "none";
		addressBook = JSON.parse(localStorage['addressBook']);
		// Loop over the array addressBook and insert into the page
		viewEmployeesDiv.innerHTML = '';
		viewEmployeesDiv.innerHTML += '<div class="back"><a href="#" class="backbutton" data-id="' + n + '">Back</a></div>';
		for(var n in addressBook){
			if (addressBook[n].organisation == orgName) {
				var peoplestr = '<div class="entry">';
				peoplestr += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
				peoplestr += '<div class="org"><p>' + addressBook[n].organisation + '</p></div>';
				peoplestr += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
				peoplestr += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
				peoplestr += '<div class="address"><p>' + addressBook[n].address + '</p></div>';
				peoplestr += '<div class="postcode"><p>' + addressBook[n].postcode + '</p></div>';
				peoplestr += '<div class="update"><a href="#" class="updatebutton" data-id="' + n + '">Update</a></div>';
				peoplestr += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
				peoplestr += '</div>';
				viewEmployeesDiv.innerHTML += peoplestr;
			}
		}
		viewEmployeesDiv.style.display = "block";
	}

	setupStorage();
	showAddressBook();
	showOrgBook();
}

function openTab(evt, tabName){
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";
}
