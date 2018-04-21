using Entities;
using FactoryService;
using Interfaces;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace ContactsManagerWebApi.Controllers
{
    [EnableCors(origins: "http://localhost:3000", headers: "*", methods: "*")]
    public class ContactsManagerController : ApiController
    {
        private IDataAccessManager _dataAccessManager = null;

        public ContactsManagerController()
        {
            _dataAccessManager = Factory.GetDataAccessManager();
        }

        [Route("api/ContactsManager/GetContacts")]
        [HttpGet]
        public IEnumerable<IContact> GetContacts()
        {
            return _dataAccessManager.GetAllContacts();
        }
        
        [Route("api/ContactsManager/AddContact")]
        [HttpPost]
        public int AddContact([FromBody]Contact newContact)
        {
            return _dataAccessManager.AddContact(newContact);
        }

        [Route("api/ContactsManager/UpdateContact")]
        [HttpPut]
        public void UpdateContact([FromBody]Contact contact)
        {
            _dataAccessManager.EditContact(contact);
        }

        [Route("api/ContactsManager/Delete")]
        [HttpDelete]
        public void Delete([FromUri]int id)
        {
            _dataAccessManager.DeleteContact(id);
        }
    }
}