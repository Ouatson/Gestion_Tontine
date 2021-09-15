import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
@Component({
  selector: 'app-leftmenu',
  templateUrl: './leftmenu.component.html',
  styleUrls: ['./leftmenu.component.scss']
})
export class LeftmenuComponent implements OnInit {
  isCollapsed = true;
  isActionsCollapsed = true;
  isProblemeCollapsed = true;
  isAuthCollapsed = true;
  isStaticticsCollapsed = true;
  isFriendsCollapsed = true;
  contactTab: boolean;
  chatTab: boolean = true;
  toggle1: boolean;
  toggle2: boolean;
  toggle3: boolean = false;
  toggle4: boolean;
  toggle5: boolean;
  fontSelect: any;
  menuIconSelect: any;
  staticscard: boolean = true;
  friendscard: boolean = true;
  constructor(private router: Router, @Inject(AppComponent) private app: AppComponent) {
    if ((this.router.url).includes('gt')) {
      this.isCollapsed = false;
    }

    if ((this.router.url).includes('action')) {
      this.isActionsCollapsed = false;
    }
    if ((this.router.url).includes('gestion')) {
      this.isProblemeCollapsed = false;
    }
    // if ((this.router.url).includes('auth')) {
    //   this.isAuthCollapsed = false;
    // }
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      debugger
      if (sessionStorage.getItem("Font1") != "" && sessionStorage.getItem("Font1") != null) {
        this.fontSelect = sessionStorage.getItem("Font1");
      }
      else {
        this.fontSelect = '';
      }

      if (sessionStorage.getItem("Toggle") != "" && sessionStorage.getItem("Toggle") != null) {
        this.toggle1 = true;
      }
      else {
        this.toggle1 = false;
      }
      if (sessionStorage.getItem("Toggle2") != "" && sessionStorage.getItem("Toggle2") != null) {
        this.toggle2 = true;
      }
      else {
        this.toggle2 = false;
      }
      if (sessionStorage.getItem("Toggle3") != "" && sessionStorage.getItem("Toggle3") != null) {
        this.toggle3 = true;
      }
      else {
        this.toggle3 = false;
      }
      if (sessionStorage.getItem("Toggle4") != "" && sessionStorage.getItem("Toggle4") != null) {
        this.toggle4 = true;
      }
      else {
        this.toggle4 = false;
      }
      if (sessionStorage.getItem("Toggle5") != "" && sessionStorage.getItem("Toggle5") != null) {
        this.toggle5 = true;
      }
      else {
        this.toggle5 = false;
      }

      const haderClassName = document.getElementById("page_top");
      if (sessionStorage.getItem("HeaderClass") != "" && sessionStorage.getItem("HeaderClass") != null) {
        haderClassName.classList.add(sessionStorage.getItem("HeaderClass"));
      }
      else {
        haderClassName.classList.remove("top_dark");
      }
      // const minSideClassName = document.getElementById("header_top");
      // if (sessionStorage.getItem("MinSideClass") != "" && sessionStorage.getItem("MinSideClass") != null) {
      //   minSideClassName.classList.add(sessionStorage.getItem("MinSideClass"));
      // }
      // else {
      //   minSideClassName.classList.remove("dark");
      // }

      if (sessionStorage.getItem("Toggle2") != "" && sessionStorage.getItem("Toggle2") != null) {
        document.getElementById('page_top').classList.add('sticky-top');
        document.getElementsByClassName('fixNavMargin')[0].classList.add('marginTop');
      }
      else {
        document.getElementById('page_top').classList.remove('sticky-top');
        document.getElementsByClassName('fixNavMargin')[0].classList.remove('marginTop');
      }

      const className = document.getElementsByClassName('card');
      const className1 = document.getElementsByClassName('btn');
      const className2 = document.getElementsByClassName('progress');
      const classArray = [className, className1, className2];
      for (let index = 0; index < classArray.length; index++) {
        const classIndex = classArray[index];
        for (let index = 0; index < classIndex.length; index++) {
          const element = classIndex[index];
          if (sessionStorage.getItem("BoxShadow") != "" && sessionStorage.getItem("BoxShadow") != null) {
            element.classList.add('box_shadow');
          }
          else {
            element.classList.remove('box_shadow');
          }
        }
      }
      console.log(this.toggle3);
    });
  }


  onTab(number) {
    this.chatTab = false;
    this.contactTab = false;
    if (number == '1') {
      this.chatTab = true;
    }
    else if (number == '2') {
      this.contactTab = true;
    }
  }

  onFontStyle(type) {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('font-opensans');
    body.classList.remove('font-montserrat');
    body.classList.remove('font-roboto');
    sessionStorage.setItem("Font1", "");
    if (type == 1) {
      body.classList.add('font-opensans');
      sessionStorage.setItem("Font1", "font-opensans");
    }
    else if (type == 2) {
      body.classList.add('font-montserrat');
      sessionStorage.setItem("Font1", "font-montserrat");
    }
    else if (type == 3) {
      body.classList.add('font-roboto');
      sessionStorage.setItem("Font1", "font-roboto");
    }
  }

  toggleSettingMenu() {
    const body = document.getElementsByClassName('right_sidebar')[0];

    if (body.classList.contains('open')) {
      body.classList.remove('open');
    }
    else {
      body.classList.add('open');
    }
    document.getElementsByClassName('overlay')[0].classList.toggle("open");
  }

  onGeneralSetting(type, e) {

    const body = document.getElementsByTagName('body')[0];

    if (type == 1) {
      body.classList.toggle('dark-mode');
      if (e.target.checked) {
        this.toggle1 = true;
        sessionStorage.setItem("Toggle", "true");
      }
      else {
        this.toggle1 = false;
        sessionStorage.setItem("Toggle", "");
      }
    }
    else if (type == 2) {
      if (e.target.checked) {
        this.toggle2 = true;
        sessionStorage.setItem("Toggle2", "true");
      }
      else {
        this.toggle2 = false;
        sessionStorage.setItem("Toggle2", "");
      }

      document.getElementById("page_top").classList.toggle("top_dark");
      if (e.target.checked) {
        sessionStorage.setItem("HeaderClass", "top_dark");
      }
      else {
        sessionStorage.setItem("HeaderClass", "");
      }
    }
    else if (type == 3) {
      if (e.target.checked) {
        this.toggle3 = true;
        sessionStorage.setItem("Toggle3", "true");
      }
      else {
        this.toggle3 = false;
        sessionStorage.setItem("Toggle3", "");
      }
      body.classList.toggle('sidebar_dark');
    }
    else if (type == 4) {
      if (e.target.checked) {
        this.toggle4 = true;
        sessionStorage.setItem("Toggle4", "true");
      }
      else {
        this.toggle4 = false;
        sessionStorage.setItem("Toggle4", "");
      }
      body.classList.toggle('gradient');
    }
    else if (type == 5) {
      if (e.target.checked) {
        this.toggle5 = true;
        sessionStorage.setItem("Toggle5", "true");
      }
      else {
        this.toggle5 = false;
        sessionStorage.setItem("Toggle5", "");
      }
      const className = document.getElementsByClassName('card');
      const className1 = document.getElementsByClassName('btn');
      const className2 = document.getElementsByClassName('progress');
      const classArray = [className, className1, className2];
      for (let index = 0; index < classArray.length; index++) {
        const classIndex = classArray[index];
        for (let index = 0; index < classIndex.length; index++) {
          const element = classIndex[index];
          if (e.target.checked) {
            element.classList.add('box_shadow');
            sessionStorage.setItem("BoxShadow", "box_shadow");
          }
          else {
            element.classList.remove('box_shadow');
            sessionStorage.setItem("BoxShadow", "");
          }
        }
      }

    }
  }

  toggleMenu() {
    const body = document.getElementsByTagName('body')[0];

    if (body.classList.contains('offcanvas-active')) {
      body.classList.remove('offcanvas-active');
    }
    else {
      body.classList.add('offcanvas-active');
    }
  }
  cToggoleMenu() {
    const body = document.getElementsByTagName('body')[0].classList.remove("offcanvas-active");
    document.getElementsByClassName('overlay')[0].classList.toggle("open");
  }

}
