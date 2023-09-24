function Modal({onClose}) {

   //Sans le createPortal, il y aurait des bugs d'overflow hidden si on a des styles à cause de l'interprétation des navigateurs
   return ReactDOM.createPortal(
<React.Fragment>
      <div className="modal fade show" tabIndex="-1" role="dialog" style={{display: "block"}}>
         <div className="modal-dialog">
            <div className="modal-content">
               <div className="modal-header">
                  <h5 className="modal-title">Modal title</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="close">
                     <span aria-hidden="true" onClick={onClose}>
                        &times;
                     </span>
                  </button>
               </div>
               <div className="modal-body">
                  <p>
                     Modal body text goes here.
                  </p>
               </div>
               <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>
                     Close
                  </button>
               </div>
            </div>
         </div>
      </div>
      <div className="modalbackdrop fade show"></div>
   </React.Fragment>, document.body
   ) 
}

function App() {
   const [modal, setModal] = React.useState(false)

   const showModal = function () {
      setModal(true)
   }

   const hideModal = function() {
      setModal(false)
   }

   const style = {
      transform: "translateY(1px)"
   }
   
   return <div className="card" style={style}>
      <div className="card-body">
         <h5 className="card-title">Card Title</h5>
         <p>
            Some quick example text to build on the chard title and make up the bulk of the card's content.
         </p>
         <button className="btn btn-primary" onClick={showModal}>
            Go somewhere
         </button>
      </div>
      {modal && <Modal onClose={hideModal}/>}
   </div>
}

const root = ReactDOM.createRoot(document.querySelector("#app"));
root.render(<App />);
