import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGalleries } from "@/hooks/use-galleries";
import { useKarasu256API } from "@/hooks/use-karasu256-api";
import { useR2Storage } from "@/hooks/use-r2-storage";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Gallery } from "@karasu-lab/karasu256-api-client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const gallerySchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  alt: z.string(),
  file: z.any().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  character: z.any().optional(),
});

export default function Gallery() {
  const api = useKarasu256API();
  const bucket = useR2Storage();
  const gallery = useGalleries();
  const [galleries, setGalleries] = useState<Gallery[]>();
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof gallerySchema>>({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      name: "",
      alt: ""
    }
  })

  useEffect(() => {
    if (!galleries) {
      setGalleries(gallery);
    }
  }, [galleries, gallery])

  function onSubmit(data: z.infer<typeof gallerySchema>) {
    setLoading(true);
    const file = data.file;
    const alt = data.alt;
    const key = `gallery/${data.name}`;

    bucket.send(new PutObjectCommand({
      Bucket: import.meta.env.VITE_CLOUDFLARE_BUCKET,
      Key: key,
      Body: file
    })).then(() => {
      api.galleries.galleriesControllerCreate({
        requestBody: {
          alt: alt,
          url: `${import.meta.env.VITE_CLOUDFLARE_PUBLIC_URL}/${key}`
        }
      }).then((res) => {
        if (galleries) {
          setGalleries([...galleries, res]);
          setLoading(false);
        }
      })
    })
  }

  return (
    <div className="m-10">
      <Form {...form}>
        <div className="mt-4">
          <FormField control={form.control}
            name="name"
            render={({ field }) => (
              <div>
                <Label form="name">Name</Label>
                <Input {...field} />
              </div>
            )}>
          </FormField>
          <FormField control={form.control}
            name="alt"
            render={({ field }) => (
              <div>
                <Label form="alt">Alt</Label>
                <Input {...field} />
              </div>
            )}
          >
          </FormField>
        </div>
        <div className="mt-4">
          <FormField control={form.control}
            name="file"
            render={({ field }) => (
              <div>
                <Label form="url">File</Label>
                <Input type="file" {...field} />
              </div>
            )}>
          </FormField>
        </div>
        <div className="mt-4">
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={loading}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  )
}