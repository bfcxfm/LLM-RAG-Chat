"use client";

import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";

export default function UploadPage() {
  return (
    <div className="m-20 w-full overflow-auto peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
      <FilePond
        allowMultiple={true}
        credits={false}
        server={{
          url: "api/upload",
        }}
      />
    </div>
  );
}
