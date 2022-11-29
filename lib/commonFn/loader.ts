export const loader =
  ({ width, height }: { width: number; height: number }) =>
  ({ src }: { src: string }) => {
    return `${process.env.NEXT_PUBLIC_IMG_URL}/w_${width},h_${height}${process.env.NEXT_PUBLIC_IMG_ID}/${src}`;
  };
