import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { FormField } from '../Services/formfield';
import { FormControl, 
             FormGroup, 
             ValidatorFn, 
             Validators } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  formFields!: FormField[];
  form = new FormGroup({});
  constructor() { }

  ngOnInit(): void {

    
// Survey
// .StylesManager
// .applyTheme("modern");

var json = {
title: "Software developer survey.",
pages: [
    {
        title: "What operating system do you use?",
        questions: [
            {
                type: "checkbox",
                name: "opSystem",
                title: "OS",
                hasOther: true,
                isRequired: true,
                choices: ["Windows", "Linux", "Macintosh OSX"]
            }
        ]
    }, {
        title: "What language(s) are you currently using?",
        questions: [
            {
                type: "checkbox",
                name: "langs",
                title: "Please select from the list",
                colCount: 4,
                isRequired: true,
                choices: [
                    "Javascript",
                    "Java",
                    "Python",
                    "CSS",
                    "PHP",
                    "Ruby",
                    "C++",
                    "C",
                    "Shell",
                    "C#",
                    "Objective-C",
                    "R",
                    "VimL",
                    "Go",
                    "Perl",
                    "CoffeeScript",
                    "TeX",
                    "Swift",
                    "Scala",
                    "Emacs Lisp",
                    "Haskell",
                    "Lua",
                    "Clojure",
                    "Matlab",
                    "Arduino",
                    "Makefile",
                    "Groovy",
                    "Puppet",
                    "Rust",
                    "PowerShell"
                ]
            }
        ]
    }, {
        title: "Please enter your name and e-mail",
        questions: [
            {
                type: "text",
                name: "name",
                title: "Name:"
            }, {
                type: "text",
                name: "email",
                title: "Your e-mail"
            }
        ]
    }
]
};

// window.survey = new Survey.Model(json);
}


}
