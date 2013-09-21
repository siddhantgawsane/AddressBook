package adaptavant.addressbook;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.jdo.PersistenceManager;
import javax.jdo.Query;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.appengine.labs.repackaged.org.json.JSONArray;
import com.google.appengine.labs.repackaged.org.json.JSONException;
import com.google.appengine.labs.repackaged.org.json.JSONObject;

@Controller
public class MainController {
	@RequestMapping(value = "/", method = RequestMethod.GET)
	String firstPage(){
		return "index";
	}
	
	@RequestMapping(value = "/getContacts", method = RequestMethod.POST) 
	@ResponseBody
	public void getContacts(HttpServletRequest req, HttpServletResponse res) throws IOException{
		res.setContentType("application/json");
		List<Contacts> results = null;
		JSONObject jo = new JSONObject();
		Collection<JSONObject> items = new ArrayList<JSONObject>();
		Query q = null;
		PersistenceManager pm = PMF.get().getPersistenceManager();
		try {
			q = pm.newQuery(Contacts.class);
			results = (List<Contacts>) q.execute();
			if (!results.isEmpty()) {
				for(Contacts u : results)
				{
					JSONObject user = new JSONObject();
					user.put("firstName",u.getFirstName());
					user.put("lastName",u.getLastName());
					user.put("mobileNo",u.getMobileNo());
					user.put("emailId",u.getEmailId());
					items.add(user);
				}
				//System.out.println(items);
				jo.put("contacts", new JSONArray(items));
			}
		}
		catch(Exception e){
			e.printStackTrace(res.getWriter());
		}	
		finally {
			//q.closeAll();
			pm.close();
		}
		res.getWriter().print(jo);
	}
	@RequestMapping(value = "/addContacts", method = RequestMethod.POST)
	void addContacts(HttpServletRequest req, HttpServletResponse res) throws IOException, JSONException{
		
		PersistenceManager pm = PMF.get().getPersistenceManager();
		res.setContentType("application/json");
		Contacts contact = new Contacts();
		StringBuffer jb = new StringBuffer();
		String line = null;
		BufferedReader reader = req.getReader();
		while ((line = reader.readLine()) != null)
		jb.append(line);
		
		JSONObject jsonObject = new JSONObject(jb.toString());
		System.out.println(jsonObject.getClass());

		contact.setFirstName(jsonObject.get("firstName").toString());
		contact.setLastName(jsonObject.get("lastName").toString());
		contact.setEmailId(jsonObject.get("emailId").toString());
		contact.setMobileNo(jsonObject.get("mobileNo").toString()); 
		pm.makePersistent(contact);
	}
}
