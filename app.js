var CONTACTS_DATA_URL = 'contacts.json';



function makeContactElement(contact) {
	var element = $('#js-contact-template').children().clone();
	element.find('.js-contact-first-name').text(contact.firstName);
	element.find('.js-contact-last-name').text(contact.lastName);
	element.find('.js-contact-street').text(contact.street);
	element.find('.js-contact-city').text(contact.city);
	element.find('.js-contact-state').text(contact.state);
	element.find('.js-contact-zip').text(contact.zip);
	element.find('.js-contact-phone').text(contact.phoneNumber);
	return element;
}

function getContactDataFromForm(formElem) {
	var jqItem = $(formElem);
	return {
		firstName: jqItem.find('input[name="form-first-name"]').val(),
		lastName: jqItem.find('input[name="form-last-name"]').val(),
		phoneNumber: jqItem.find('input[name="form-phone"]').val(),
		street: jqItem.find('input[name="form-street"]').val(),
		city: jqItem.find('input[name="form-city"]').val(),
		state: jqItem.find('input[name="state"]').val(),
		zipCode: jqItem.find('input[name="zip"]').val()
	}
}

function loadContactsData() {
	$.getJSON(CONTACTS_DATA_URL, function(data) {
		var contactElements = data.contacts.map(makeContactElement);
		$('.js-my-contacts').append(contactElements);
	});
}

function watchForNewContact() {
	$('.js-add-contact').submit(function(event) {
		event.preventDefault();
		var contactData = getContactDataFromForm(event.currentTarget)
		$('.js-my-contacts').prepend(makeContactElement(contactData));
	});
}


$(function() {
	loadContactsData();
	watchForNewContact();
});