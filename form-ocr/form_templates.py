# 📌 form_templates.py
# This file defines form field templates for different form types.

FORM_TEMPLATES = {
    "Biodata": {
        "Personal Information": ["Full Name", "Date of Birth"],
        "Contact Details": ["Address", "City", "Phone Number", "Email Address"],
        "Family Information": ["Father's Name", "Father's Occupation", "Mother's Name", "Mother's Occupation"],
        "Educational Background": ["Highest Qualification", "Institution Name", "Year of Passing", "Percentage"],
        "Professional Details": ["Current Occupation", "Company Name", "Work Experience (years)", "Key Skills"],
        "Miscellaneous": ["Hobby", "Languages Known"]
    },
    "Admission": {
        "Personal Details": ["Full Name", "Date of Birth", "Gender"],
        "Educational Details": ["School", "Percentage"],
        "Contact Information": ["Address", "City", "State", "Postal Code", "Phone Number", "Email Address"],
        "Course Details": ["Course Applied For", "Preferred Stream"]
    },
    "Bank Account": {
        "Bank Details": ["Bank Name", "Branch", "Form Type", "Date", "Type of Account"],
        "Personal Details": ["Full Name", "Date of Birth", "Gender", "Nationality", "Marital Status", "Occupation", "Monthly Income (approx.)"],
        "Contact Information": ["Address", "City", "State", "Postal Code", "Phone Number", "Email Address"]
    }
}
