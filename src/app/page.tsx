import { Wrapper, WrapperBody } from "~/shared/components";
import { RHFExample } from "~/shared/components/form/example";
import { ToastExample } from "~/shared/components/toast-example";

export default async function Home() {
  return (
    <Wrapper>
      <WrapperBody>
        <ToastExample />
        <RHFExample />
      </WrapperBody>
    </Wrapper>
  );
}
