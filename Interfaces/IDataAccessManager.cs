using System.Collections.Generic;

namespace Interfaces
{
    public interface IDataAccessManager
    {
        List<IContact> GetAllContacts();

        int AddContact(IContact contact);

        void EditContact(IContact contact);

        void DeleteContact(int contatctIdToBeDeleted);
    }
}
