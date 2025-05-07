import {
  useDeleteFilmMutation,
  useGetFilmByIdQuery,
  useUpdateFilmMutation,
} from "@/app/_api-client/filmApi";
import { useGetGenresQuery } from "@/app/_api-client/genreApi";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FilmType } from "@/generated/prisma";
import { filmSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormFields = [
  {
    id: "title",
    name: "title",
    label: "Judul",
    type: "text",
    placeholder: "Masukkan judul",
  },
  {
    id: "description",
    name: "description",
    label: "Deskripsi",
    type: "text",
    placeholder: "Masukkan deskripsi",
  },
  {
    id: "thumbnail",
    name: "thumbnail",
    label: "Thumbnail",
    type: "text",
    placeholder: "Masukkan thumbnail",
  },
  {
    id: "videoUrl",
    name: "videoUrl",
    label: "Video URL",
    type: "text",
  },
  {
    id: "type",
    name: "type",
    label: "Tipe",
    type: "select",
    placeholder: "Pilih tipe",
  },
  {
    id: "tag",
    name: "tag",
    label: "Tag",
    type: "text",
    placeholder: "Masukkan tag",
  },
  {
    id: "genreId",
    name: "genreId",
    label: "Genre",
    type: "select",
    placeholder: "Pilih genre",
  },
  {
    id: "maxAge",
    name: "maxAge",
    label: "Maksimal Umur",
    type: "number",
    placeholder: "Masukkan maksimal umur",
  },
  {
    id: "totalEpisode",
    name: "totalEpisode",
    label: "Total Episode",
    type: "number",
    placeholder: "Masukkan total episode",
  },
  {
    id: "rating",
    name: "rating",
    label: "Rating",
    type: "text",
    placeholder: "Masukkan rating ex: 4.5",
  },
];

export function EditFilmSheet({
  open,
  onOpenChange,
  id,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id: string;
}) {
  const { data: film } = useGetFilmByIdQuery(id, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });
  const { data: genres } = useGetGenresQuery();

  const [updateFilm, { isLoading }] = useUpdateFilmMutation();

  const [deleteFilm, { isLoading: isDeleting }] = useDeleteFilmMutation();

  const form = useForm<z.infer<typeof filmSchema>>({
    resolver: zodResolver(filmSchema),
    mode: "onChange",
    values: film?.data,
  });

  const onSubmit = (data: z.infer<typeof filmSchema>) => {
    updateFilm({
      id,
      film: data,
    })
      .unwrap()
      .then((res) => {
        toast.success(res.message);
        onOpenChange(false);
      })
      .catch((err) => {
        toast.error(err.data.message);
      });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className=" overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Edit Film</SheetTitle>
          <SheetDescription>
            Edit film here. Click save when youre done.
          </SheetDescription>
        </SheetHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(onSubmit)();
          }}
        >
          <Form {...form}>
            <div className="p-4 ">
              {FormFields.map((item) => (
                <div className="gap-4 py-2" key={item.id}>
                  <FormField
                    key={item.id}
                    control={form.control}
                    name={item.name as keyof z.infer<typeof filmSchema>}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{item.label}</FormLabel>
                        <FormControl>
                          {item.type === "text" ? (
                            <Input {...field} />
                          ) : item.type === "number" ? (
                            <Input type="number" {...field} />
                          ) : item.type === "select" ? (
                            <Select
                              value={field?.value?.toString() || ""}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder={item.placeholder} />
                              </SelectTrigger>
                              <SelectContent>
                                {item.name === "genreId"
                                  ? genres?.data?.items?.map((item, index) => (
                                      <SelectItem value={item.id} key={index}>
                                        {item.name}
                                      </SelectItem>
                                    ))
                                  : [
                                      {
                                        key: FilmType.NEW_RELEASE,
                                        value: "Episode Baru",
                                      },
                                      {
                                        key: FilmType.TOP_RATED,
                                        value: "Top Rated",
                                      },
                                      {
                                        key: FilmType.PREMIUM,
                                        value: "Premium",
                                      },
                                    ].map((item, index) => (
                                      <SelectItem value={item.key} key={index}>
                                        {item.value}
                                      </SelectItem>
                                    ))}
                              </SelectContent>
                            </Select>
                          ) : null}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          </Form>
          <SheetFooter>
            <SheetClose asChild>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Loading..." : "Save changes"}
              </Button>
            </SheetClose>
            <SheetClose asChild>
              <Button
                variant="destructive"
                type="button"
                onClick={() => deleteFilm(id)}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </SheetClose>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
