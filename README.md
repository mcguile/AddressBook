# AddressBook

A locally stored address book to list organisations and people. It allows the user to see the names and contact details of people in organisations, and to manage the people who are in an organisation. It can store a name and contact details for each organisation. The address book allows organisations and people to be created, edited and deleted.

The address book is for use by a single person and as such there is no authentication.

Assumptions made:
1. All fields must be filled to add a person or organisation.
2. Entries do not need to be unique.
3. A person cannot be added without their organisation existing in the database.
4. Deleting an organisation does not delete people who worked there.
5. There are no limits set on data entry size per field.
6. All data is case-sensitive.

To run: 
1. Download all files
2. Execute adressBook.htm in a browser.

Two tabs are available: organisation - lists all organisations; or people - lists all people from all organisations. If a list of employees from one organisation is required, find the organisation then click view.

Possible updates: 
1. Autocomplete organisation field
2. Search for organisations or people
3. Sort alphabetically
4. Verification for updating/deleting
