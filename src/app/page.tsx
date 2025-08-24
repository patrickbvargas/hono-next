import { Wrapper, WrapperBody } from "~/shared/components";
import { RHFExample } from "~/shared/components/form/example";

export default async function Home() {
  return (
    <Wrapper>
      <WrapperBody>
        <RHFExample />
      </WrapperBody>
    </Wrapper>
  );
}
