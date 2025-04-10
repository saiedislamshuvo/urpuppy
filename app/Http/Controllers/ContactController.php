<?php

namespace App\Http\Controllers;

use App\Mail\AdminNewContact;
use App\Mail\SupportTeamEmailResponseMail;
use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function index(Request $request)
    {

        return inertia()->render('ContactUs');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'account_type' => 'required|string|max:50',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string',
        ]);

        Contact::create($validated);

        Mail::queue(new AdminNewContact($validated));

        Mail::queue(new SupportTeamEmailResponseMail($validated['first_name'].' '.$validated['last_name'], $validated['email']));

        return redirect()->back()->with('message.success', 'Your message has been sent successfully!');
    }
}
