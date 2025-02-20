import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash } from 'lucide-react';

const ListOutings = () => {
  const [outings, setOutings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch outings from the backend
  useEffect(() => {
    const fetchOutings = async () => {
      try {
        const response = await axios.get('http://localhost:4000/allOutings');
        setOutings(response.data); // Assuming the API returns an array of outings
        setLoading(false);
      } catch (error) {
        console.error('Error fetching outings:', error);
        setLoading(false);
      }
    };

    fetchOutings();
  }, []);

  // Handle outing removal
  const handleRemove = async () => {
    try {
      await axios.post('http://localhost:4000/removeouting', { id: deleteId });
      setOutings(outings.filter(outing => outing.id !== deleteId));
      setIsDeleteDialogOpen(false);
      setDeleteId(null);
    } catch (error) {
      console.error('Error removing outing:', error);
    }
  };

  // Navigate to edit outing page
  const handleEdit = (id) => {
    navigate(`/updateOuting/${id}`);
  };

  // Open delete confirmation dialog
  const openDeleteDialog = (id) => {
    setDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-2rem)] ml-[280px] p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="ml-[280px] p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Outings</h1>
      </div>

      {/* Outings Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Next Available Date</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {outings.map((outing) => (
              <TableRow key={outing.id}>
                <TableCell className="font-medium">{outing.name}</TableCell>
                <TableCell>{outing.category}</TableCell>
                <TableCell>{outing.location}</TableCell>
                <TableCell>
                  {outing.nextdate
                    ? new Date(outing.nextdate).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEdit(outing.id)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={() => openDeleteDialog(outing.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Outing</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this outing? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleRemove}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ListOutings;