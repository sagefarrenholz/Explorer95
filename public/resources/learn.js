let file_dir = []; // Set title bar d

document.getElementById("title").innerText += ' C:\\' + document.URL.split('/').slice(3).join('\\');
const http = new XMLHttpRequest(); // Send request for file directory

http.open("GET", document.URL + '?f=1');
http.send();
document.body.style.cursor = "wait"; // Make window draggable
// ==-- React --===

class List_Item extends React.Component {
  update(val) {
    this.setState({
      value: val
    });
  }

  render() {
    const source = this.props.source;
    const label = this.props.label;
    let img;

    if (source.isDirectory === true) {
      let _href;

      if (source.link) {
        _href = source.link;
      } else {
        _href = label;
      }

      img = /*#__PURE__*/React.createElement("div", {
        class: "dir_icon"
      });
      return /*#__PURE__*/React.createElement("div", {
        className: "item directory"
      }, img, /*#__PURE__*/React.createElement("a", {
        href: _href
      }, label));
    } else {
      // TODO Ad indivualized icons
      img = /*#__PURE__*/React.createElement("div", {
        class: "file_icon"
      });
      return /*#__PURE__*/React.createElement("div", {
        className: "item file"
      }, img, /*#__PURE__*/React.createElement("a", {
        href: label
      }, label));
    }
  }

}

class List extends React.Component {
  render() {
    let list = [];

    if (file_dir !== null) {
      for (const entry in this.props.dir) {
        list.push( /*#__PURE__*/React.createElement(List_Item, {
          key: entry,
          label: entry,
          source: this.props.dir[entry]
        }));
      }
    }

    return /*#__PURE__*/React.createElement("div", null, list);
  }

} // ==-- XHTTPRequest --==


http.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    file_dir = JSON.parse(this.responseText);
    ReactDOM.render(
    /*#__PURE__*/
    //<Draggable>
    React.createElement(List, {
      dir: file_dir
    }) //</Draggable>
    , document.getElementById('root'));

    for (let item of document.getElementsByName('item')) {
      item.onclick = event => {
        event.preventDefault(); //Dotted outline

        item.style.cssText += "border-radius: 1px; border: 1px dashed black;";
        return false;
      };

      item.ondblclick = event => {
        document.location = item.href;
      };
    }

    document.body.style.cursor = "default";
    document.getElementById('objects').innerText = Object.keys(file_dir).length;
  }
};

function addComponent() {
  http.open("GET", document.URL + '?f=1');
  http.send();
} // ==-- Draggable Window --==


function makeDraggable(element) {
  let x0 = 0,
      y0 = 0,
      x1 = 0,
      y1 = 0;
  element.parentElement.onmousedown = mouseDown;

  function mouseDown(event) {
    event = event || window.event;
    event.preventDefault();
    x0 = event.clientX;
    y0 = event.clientY;
    document.onmouseup = mouseUp;
    document.onmousemove = mouseDrag;
  }

  function mouseUp() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function mouseDrag(event) {
    event = event || window.event;
    event.preventDefault();
    x1 = x0 - event.clientX;
    y1 = y0 - event.clientY;
    x0 = event.clientX;
    y0 = event.clientY;
    element.parentElement.style.left = element.parentElement.offsetLeft - x1 + 'px';
    element.parentElement.style.top = element.parentElement.offsetTop - y1 + 'px';
  }
}

function dragElement(elmnt) {
  var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault(); // get the mouse cursor position at startup:

    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement; // call a function whenever the cursor moves:

    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault(); // calculate the new cursor position:

    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY; // set the element's new position:

    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}