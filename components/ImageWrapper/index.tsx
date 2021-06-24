import React, { FC } from 'react';
import {
  AspectRatio_1x1,
  ImageLayer,
  Image,
  StyledImageWrapper,
} from './styles';

type ImageWrapperProps = {
  productImage?: string
}

const ImageWrapper: FC<ImageWrapperProps> = ({ productImage }) => {
  return (
    <StyledImageWrapper>
      <AspectRatio_1x1>
        <ImageLayer>
          <Image
            src={productImage}
            alt={productImage}
            width="300px"
            height="300px"
          />
        </ImageLayer>
      </AspectRatio_1x1>
    </StyledImageWrapper>
  
  )
}

export default ImageWrapper;