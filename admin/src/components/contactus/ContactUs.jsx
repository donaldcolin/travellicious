import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2, Copy, Trash2, Mail, Phone, Check } from "lucide-react";
import { useToast } from "/src/hooks/use-toast.js";

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://localhost:4000/allcontact");
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setContacts(data);
        } else {
          setError("Invalid data format received");
        }
      } catch (error) {
        setError("Failed to fetch contacts");
        console.error("Error fetching contacts:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchContacts();
  }, []);

  const handleCopy = (phone, id) => {
    navigator.clipboard.writeText(phone);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    
    toast({
      title: "Copied!",
      description: (
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-green-500" />
          <span>Phone number copied to clipboard</span>
        </div>
      ),
      duration: 2000,
    });
  };

  const handleStatusChange = async (_id, newStatus) => {
    try {
      const response = await fetch("http://localhost:4000/updatestatus", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id, status: newStatus }),
      });

      if (response.ok) {
        setContacts((prevContacts) =>
          prevContacts.map((contact) =>
            contact._id === _id ? { ...contact, status: newStatus } : contact
          )
        );
        toast({
          title: "Status updated",
          description: "Contact status has been updated successfully",
          duration: 2000,
        });
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Update failed",
        description: "Failed to update contact status",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleRemove = async (_id) => {
    try {
      const response = await fetch("http://localhost:4000/removecontact", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id }),
      });

      if (response.ok) {
        setContacts(contacts.filter((contact) => contact._id !== _id));
        toast({
          title: "Contact removed",
          description: "Contact has been removed successfully",
          duration: 2000,
        });
      } else {
        throw new Error('Failed to remove contact');
      }
    } catch (error) {
      console.error("Error removing contact:", error);
      toast({
        title: "Removal failed",
        description: "Failed to remove contact",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle className="text-destructive">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved':
        return 'text-green-600 bg-green-100';
      case 'Contacted':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  return (
    <div className="ml-[280px] p-8"> {/* Added margin-left to prevent sidebar overlap */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Contacted</h1>
    </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead className="min-w-[300px]">Contact Info</TableHead>
                  <TableHead className="min-w-[250px]">Status</TableHead>
                  <TableHead className="w-[100px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact._id}>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <span className="text-sm truncate">{contact.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <span className="text-sm">{contact.phone}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(contact.phone, contact._id)}
                            className="h-6 w-6 p-0 ml-auto shrink-0"
                          >
                            {copiedId === contact._id ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(contact.status)}`}>
                          {contact.status || 'Pending'}
                        </div>
                        <Select
                          value={contact.status || 'Pending'}
                          onValueChange={(value) => handleStatusChange(contact._id, value)}
                        >
                          <SelectTrigger className="w-[130px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Contacted">Contacted</SelectItem>
                            <SelectItem value="Resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Remove Contact</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to remove this contact? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleRemove(contact._id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Remove
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
</div>)}
export default ContactList;