import React from 'react';
import { toast } from 'react-toastify';

import "./notification.scss";

interface message {
  id: number,
  content: string,
  type?: string,
  hasBeenShown?: boolean
}

interface notificationProp {
  yibao: number,
  nextMessage: message
}

export default class Notification extends React.Component<notificationProp, any> {

  buffer: message[] = [];

  display: message[] = [];

  state = {
    buffer: this.buffer,
    display: this.display
  }

  pushMessage = () => {
      // push buffer to display queue
      while (this.display.length < 5 && this.buffer.length > 0) {

        this.display.push(this.buffer[0]);
        this.buffer.shift();

      }

      // display notifications in display queue

      for (let message of this.display) {
        if (message.hasBeenShown === false) {
          message.hasBeenShown = true;
          this.notify(message).then(
            (id) => {

              this.display = this.display.filter((msg) => { return msg.id !== id});
              // let pos = this.display.findIndex( (msg) => {  return msg.id === this.display[i].id });
              // this.display.splice(pos, 1);
              // this.displayPointer--;
              // remove element from display after being notified
              // this.display.filter((msg) => { return msg.id !== message.id});
            }
          )
        }

      }


  };

  componentDidUpdate(prevProps: any) {
    this.main(prevProps);
  }

  componentDidMount() {
    
    setInterval(() => {
      this.pushMessage()
    }, 500);
  }

  main = (prevProps: any) => {

    // console.log(prevProps.nextMessage, this.props.nextMessage);

    if (prevProps.nextMessage.id !== this.props.nextMessage.id && this.props.nextMessage.id > 0) {

      let parsedMessage: message = {
        ...this.props.nextMessage,
        content: this.props.nextMessage.content.replace(/<%yibao>/g, this.props.yibao.toString()),
        hasBeenShown: false
      }

      this.buffer.push(parsedMessage);

    }
  };

  notify = (message: message) => {
    return new Promise((resolve, reject) => {
      
      switch (message.type) {
        case "success": 
          toast.success(message.content, {
            position: toast.POSITION.BOTTOM_RIGHT,
            onClose: () => {resolve(message.id);}
          });
          break;
        case "error":
          toast.error(message.content, {
            position: toast.POSITION.BOTTOM_RIGHT,
            onClose: () => {resolve(message.id);}
          })
          break;
        default:
          toast(message.content, {
            position: toast.POSITION.BOTTOM_RIGHT,
            onClose: () => {resolve(message.id);}
          })
          break;
      }

    });
  };

  render() {
    return (
      <section className="notification">
      </section>
    );
  }
}