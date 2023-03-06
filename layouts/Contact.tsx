import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";
import {useState} from 'react'
import axios from 'axios'
import { useRouter } from "next/router";

const Contact = ({ data }) => {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const { contact_form_action, listId, add_contact_to_list_url } = config.params;

  const router = useRouter()

  const onSubmit = async (e) => {
    try {
      e.preventDefault()
      console.log('onSubmit called')
      console.log(add_contact_to_list_url, { email, name, listId }, ' add_contact_to_list_url, { email, name, listId }')
      await axios.post(
        add_contact_to_list_url,
        { email, name, listId },
        {
          headers: {
            'content-type': 'application/json'
          }
        }
      )

      router.push('/success')
    } catch(e) {
      console.log(e, ' unable to submit')
    }
  }

  const onChangeEmail = (e: any) => setEmail(e.target.value)

  const onChangeName = (e: any) => setName(e.target.value)

  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        <div className="section row pb-0">
          <div className="col-12 md:col-6 lg:col-7">
            <form
              className="contact-form"
              onSubmit={onSubmit}
            >
              <input
                type="hidden"
                name="listId"
                value={3}
              />
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="name"
                  type="text"
                  placeholder="Name"
                  required
                  onChange={onChangeName}
                  value={name}
                />
              </div>
              <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="email"
                  type="email"
                  placeholder="Your email"
                  required
                  onChange={onChangeEmail}
                  value={email}
                />
              </div>
              {/* <div className="mb-3">
                <input
                  className="form-input w-full rounded"
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="mb-3">
                <textarea
                  className="form-textarea w-full rounded-md"
                  rows={7}
                  placeholder="Your message"
                />
              </div> */}
               <button type="submit"  className="btn btn-primary">
                  Join The Waiting List!
                </button>
            </form>

          </div>
          <div className="content col-12 md:col-6 lg:col-5">
            {markdownify(info.title, "h4")}
            {markdownify(info.description, "p", "mt-4")}
            <ul className="contact-list mt-5">
              {info.contacts.map((contact, index) => (
                <li key={index}>
                  {markdownify(contact, "strong", "text-dark")}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
