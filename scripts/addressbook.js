window.onload = function(){
	// Buttons
	var quickAddBtn = document.getElementById('QuickAdd');
	var quickAddOrgBtn = document.getElementById('QuickAddOrg');
	var quickAddFormDiv = document.querySelector('.quickaddForm');
	var quickAddOrgFormDiv = document.querySelector('.quickaddorgForm');
	var cancelBtn = document.getElementById('Cancel');
	var cancelOrgBtn = document.getElementById('CancelOrg');
	var AddBtn = document.getElementById('Add');
	var AddOrgBtn = document.getElementById('AddOrg');
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
	var addressBookDiv = document.querySelector('.peoplebook');
	var orgBookDiv = document.querySelector('.orgbook');

	quickAddBtn.addEventListener("click", function(){
		// display the form div
		quickAddOrgFormDiv.style.display = "none";
		quickAddFormDiv.style.display = "block";
	});

	quickAddOrgBtn.addEventListener("click", function(){
		// display the form div
		quickAddFormDiv.style.display = "none";
		quickAddOrgFormDiv.style.display = "block";
	});

	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
	});

	cancelOrgBtn.addEventListener("click", function(){
		quickAddOrgFormDiv.style.display = "none";
	});

	AddBtn.addEventListener("click", addToBook);
	AddOrgBtn.addEventListener("click", addToOrgBook);

	addressBookDiv.addEventListener("click", removeEntry);
	orgBookDiv.addEventListener("click", removeEntry);

	// Storage Array
	var addressBook = [];
	var orgBook = [];

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

	function addToBook(){
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
				// format the input into a valid JSON structure
				var obj = new jsonStructure(fullname.value,organisation.value,phone.value,address.value,postcode.value,email.value);
				addressBook.push(obj);
				localStorage['addressBook'] = JSON.stringify(addressBook);
				quickAddFormDiv.style.display = "none";
				clearForm();
				showAddressBook();
			} else {
				window.alert("Organisation does not exist in the database. Please ammend the field or add a new organisation.")
			}
		} else {
			window.alert("Please fill in all fields")
		}
	}

	function addToOrgBook(){
		var isNotNull = orgName.value!='' && orgPhone.value!='' && orgAddress.value!='' && orgPostcode.value!='' && orgEmail.value!='';
		if(isNotNull){
			// format the input into a valid JSON structure
			var obj = new orgJsonStructure(orgName.value,orgPhone.value,orgAddress.value,orgPostcode.value,orgEmail.value);
			orgBook.push(obj);
			localStorage['orgBook'] = JSON.stringify(orgBook);
			quickAddOrgFormDiv.style.display = "none";
			clearForm();
			showOrgBook();
		} else {
			window.alert("Please fill in all fields.")
		}
	}

	//TODO
	function updateEntry(e){
		// Update an entry from the addressbook
		if(e.target.classList.contains('updatebutton')){
			var uID = e.target.getAttribute('data-id');
			addressBook.splice(uID,1);
			localStorage['addressBook'] = JSON.stringify(addressBook);
			showAddressBook();
		} else if (e.target.classList.contains('orgupdatebutton')){
			var uID = e.target.getAttribute('data-id');
			orgBook.splice(uID,1);
			localStorage['orgBook'] = JSON.stringify(orgBook);
			showOrgBook();
		}
	}

	function removeEntry(e){
		// Remove an entry from the addressbook
		if(e.target.classList.contains('delbutton')){
			var remID = e.target.getAttribute('data-id');
			addressBook.splice(remID,1);
			localStorage['addressBook'] = JSON.stringify(addressBook);
			showAddressBook();
		} else if (e.target.classList.contains('orgdelbutton')){
			var remID = e.target.getAttribute('data-id');
			orgBook.splice(remID,1);
			localStorage['orgBook'] = JSON.stringify(orgBook);
			showOrgBook();
		}
	}

	function clearForm(){
		var formFields = document.querySelectorAll('.formFields');
		for(var i in formFields){
			formFields[i].value = '';
		}
	}

	function showAddressBook(){
		addressBook = JSON.parse(localStorage['addressBook']);
		// Loop over the array addressBook and insert into the page
		addressBookDiv.innerHTML = '';
		for(var n in addressBook){
			var orgst = '<div class="entry">';
			var peoplestr = '<div class="entry">';
			peoplestr += '<div class="name"><p>' + addressBook[n].fullname + '</p></div>';
			peoplestr += '<div class="org"><p>' + addressBook[n].organisation + '</p></div>';
			peoplestr += '<div class="email"><p>' + addressBook[n].email + '</p></div>';
			peoplestr += '<div class="phone"><p>' + addressBook[n].phone + '</p></div>';
			peoplestr += '<div class="address"><p>' + addressBook[n].address + '</p></div>';
			peoplestr += '<div class="postcode"><p>' + addressBook[n].postcode + '</p></div>';
			peoplestr += '<div class="del"><a href="#" class="delbutton" data-id="' + n + '">Delete</a></div>';
			peoplestr += '</div>';
			addressBookDiv.innerHTML += peoplestr;
		}
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
			orgstr += '<div class="orgdel"><a href="#" class="orgdelbutton" data-id="' + n + '">Delete</a></div>';
			orgstr += '</div>';
			orgBookDiv.innerHTML += orgstr;
		}
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
