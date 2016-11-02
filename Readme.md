# Hiraku
A Drawer Navigation menu for your mobile webs

## Installation

npm

```
npm install Hiraku
```

## Setup

```html
<link rel="stylesheet" type="text/css" href="./src/hiraku.css">
<script src="http://code.jquery.com/jquery-2.2.4.min.js"></script>
<script src="./src/hiraku.js"></script>
```

## How to use

### Open drawer menu from left side

```html
<p><a class="acms-admin-btn" id="offcanvas-btn-left" href="#">Open Drawer menu from left side</a></p>
<div class="offcanvas-left">
    Drawer menu's contents here
</div>
```

```js
$(".offcanvas-left").hiraku({
	btn:"#offcanvas-btn-left",
	//Button selector to open the offcanvas menu
	fixedHeader:".js-offcanvas-header",
	//If you want to fix header, you may want to set the selector here
	direction:"left"
});
```

### Open drawer menu from right side

```html
<p><a class="acms-admin-btn" id="offcanvas-btn-right" href="#">Open Drawer menu from right side</a></p>
<div class="offcanvas-left">
    Drawer menu's contents here
</div>
```

```js
$(".offcanvas-right").hiraku({
	btn:"#offcanvas-btn-right",
	fixedHeader:".js-offcanvas-header",
	direction:"right"
});
```
