import React from 'react'

const InfoMessage = () => {
  return (
    <React.Fragment>
      <p className="o-app__infoMsg" tabIndex="0">This page is completely accessible. If you want to use your keyboard, go ahead and try it!</p>
      <p className="o-app__infoMsg" tabIndex="0">To remove an item press <code><strong>del</strong></code> in your keyboard when you focus to TODO item</p>
      <p className="o-app__infoMsg" tabIndex="0">You can also delete todo by hovering the item and then press the <code><strong>delete</strong></code> button</p>
      <p className="o-app__infoMsg -author"
        id="authorParagraph"
        tabIndex="0"
        aria-label="Made With Love by Abdullah Furkan Ozbek"
        >
        Made with
        <span role="img" aria-labelledby="authorParagraph"> ❤️</span> by
        <a className="o-app__author" 
          aria-label="To Visit Creator's Github Page, please press enter button"
          href="https://github.com/afozbek">
          {" "}
          Abdullah Furkan Özbek
        </a>
      </p>
    </React.Fragment>
  )
}

export default InfoMessage
